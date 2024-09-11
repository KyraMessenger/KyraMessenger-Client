import { useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";

export default function EditProfile({ isOpen, onClose }) {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    profilePicture: "",
  });

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSave = () => {
    // Add your save logic here
    console.log("Profile updated:", { fullName, profilePicture });
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Body>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="fullName" value="Full Name" />
            <TextInput
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="profilePicture" value="Profile Picture URL" />
            <TextInput
              id="profilePicture"
              type="text"
              placeholder="Enter profile picture URL"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleSave}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save Changes
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
