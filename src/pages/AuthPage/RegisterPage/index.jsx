import { useState } from "react";
import RegisterPageView from "./view";
import { postRegister } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchRegister = async () => {
    try {
      const response = await postRegister(email, username, password);
      console.log(response);

      nav("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    fetchRegister();
  };

  return (
    <RegisterPageView
      email={email}
      username={username}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onUsernameChange={onUsernameChange}
      handleSubmit={handleSubmit}
    />
  );
}
