import { useState, useContext, useEffect } from "react";
import { Sidebar, Avatar, Dropdown } from "flowbite-react";
import { UserContext } from "../context/userContext";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../utils/api";

export default function ChatSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);

  const nav = useNavigate();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const handleOpenProfileModal = () => setIsProfileModalOpen(true);
  const handleCloseProfileModal = () => setIsProfileModalOpen(false);

  const [chatUsers, setChatUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await getAllUser();

      setChatUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = chatUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  useEffect(() => {
    if (user) {
      fetchAllUsers();
    }
  }, [user]);

  return (
    <div className="w-80 h-full flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar img={user.Profile?.profilePicture} rounded={true} />
          <div>
            <h2 className="text-lg text-white font-semibold">
              {user.username}
            </h2>
          </div>
          {/* Dropdown Button */}
          <Dropdown
            inline
            label={<span className="text-gray-500 hover:text-gray-700"></span>}
            className="ml-auto"
          >
            <Dropdown.Item onClick={handleOpenProfileModal}>
              Edit Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className="text-red-600">
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
        <EditProfile
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
        />
      </div>
      {/* Search Bar */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-300"
        />
      </div>
      {/* Chat List */}
      <div className="flex-grow h-full overflow-y-auto">
        {" "}
        {/* Full height & scrollable */}
        <Sidebar aria-label="Chat Sidebar" className="w-full">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((chatUser) => (
                  <Sidebar.Item
                    key={chatUser.id}
                    className="bg-transparent hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        img={chatUser?.Profile.profilePicture}
                        rounded={true}
                      />
                      <div>
                        <h3 className="font-semibold">{chatUser.username}</h3>
                        <p className="text-sm text-gray-500">offline</p>
                      </div>
                    </div>
                  </Sidebar.Item>
                ))
              ) : (
                <p className="text-center text-gray-500 p-4">No chats found</p>
              )}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}
