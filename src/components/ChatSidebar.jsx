import { useState } from "react";
import { Sidebar, Avatar } from "flowbite-react";

export default function ChatSidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const user = {
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
          <Avatar img={user.profileImg} rounded={true} />
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">My Profile</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
        />
      </div>

      {/* Chat List with fixed height */}
      <div className="flex-grow h-screen overflow-y-auto">
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
                <p className="text-center text-gray-500 p-4">No chats found</p>
              )}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}
