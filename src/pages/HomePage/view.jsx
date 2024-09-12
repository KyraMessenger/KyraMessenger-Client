import { io } from "socket.io-client";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { getNewMessage } from "../../utils/api";
import EmojiPicker from "emoji-picker-react"; // Import the emoji picker
import logoHeader from "../../assets/logo_test_with_clouds_1.gif";

export default function HomePageView() {
  const socket = io("https://kyra.yubenbauty.site");
  const [socketId, setSocketId] = useState("");
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const { user } = useContext(UserContext);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchNewMessage = async () => {
    try {
      const { data } = await getNewMessage();
      setNewMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message, from: user.id });
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  useEffect(() => {
    fetchNewMessage();

    socket.on("welcome", ({ id, message }) => {
      console.log("message from server :", message, id);
      setSocketId(id);
    });

    socket.on("new-message", (dataValues) => {
      setNewMessage((prevMessages) => [...prevMessages, dataValues]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [newMessage]); // Scroll to bottom whenever new messages arrive

  return (
    <div className="h-[80vh] flex flex-col border-l ">
      <div className="flex items-center justify-center ">
        <img src={logoHeader} alt="" className="w-28" />
      </div>

      {/* Message Display Section */}
      <div className="flex-grow h-[80vh] overflow-y-auto p-4">
        {newMessage.length >= 1 ? (
          newMessage.map((el) => {
            const isSender = el.UserId === user.id;
            return (
              <div
                key={el.id}
                className={`flex items-start mb-4 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                {!isSender && (
                  <img
                    src={el.User?.Profile?.profilePicture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    isSender
                      ? "bg-blue-500 text-white text-right"
                      : "bg-gray-200 text-black text-left"
                  }`}
                >
                  <p className="text-xs font-bold">{el.User?.username}</p>
                  <p className="mt-1 text-lg break-words">{el.message}</p>
                </div>
                {isSender && (
                  <img
                    src={el.User?.Profile?.profilePicture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full ml-3"
                  />
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
        {/* Dummy element to auto-scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Section */}
      <div className="p-4 border-t flex">
        <input
          type="text"
          className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Write your message here"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
        />

        {/* Emoji Picker Button */}
        <button
          type="button"
          className="p-2 bg-gray-300 rounded-full mr-2"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-4">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <button
          disabled={message.length === 0}
          onClick={sendMessage}
          className="flex-shrink-0 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
