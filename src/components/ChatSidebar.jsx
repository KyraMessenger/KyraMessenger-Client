import { useState } from "react";
import { Sidebar, Avatar, Dropdown } from "flowbite-react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function ChatSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useContext(UserContext);
  console.log(user);

  const users = {
    name: "John Doe",
    profileImg: "https://via.placeholder.com/150",
  };

  const chatUsers = [];

  const filteredUsers = chatUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 h-full border-r flex flex-col">
      {/* Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar img={users.Profile?.profilePicture} rounded={true} />
          <div>
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-sm text-gray-500">My Profile</p>
          </div>
          {/* Dropdown Button */}
          <Dropdown
            inline
            label={<span className="text-gray-500 hover:text-gray-700"></span>}
            className="ml-auto"
          >
            <Dropdown.Item href="#">Report this page</Dropdown.Item>
            <Dropdown.Item href="#">Add to favorites</Dropdown.Item>
            <Dropdown.Item href="#">Block this page</Dropdown.Item>
            <Dropdown.Item href="#">Invite users</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-300 focus:ring-primary-600 focus:border-primary-600"
        />
      </div>

      {/* Chat List with fixed height */}
      <div className="flex-grow h-screen overflow-y-auto opacity-0">
        <Sidebar aria-label="Chat Sidebar">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((chatUser) => (
                  <Sidebar.Item key={chatUser.id} href="#">
                    <div className="flex items-center space-x-3">
                      <Avatar img={chatUser.img} rounded={true} />
                      <div>
                        <h3 className="font-semibold">{chatUser.name}</h3>
                        <p className="text-sm text-gray-500">
                          {chatUser.status}
                        </p>
                      </div>
                    </div>
                  </Sidebar.Item>
                ))
              ) : (
                <p className="text-center text-gray-500 p-4 ">No chats found</p>
              )}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}
