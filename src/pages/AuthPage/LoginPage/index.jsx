import { useState } from "react";
import LoginPageView from "./view";
import { postLogin } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onEmailChange = (e) => {
    setEmailOrUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const fetchLogin = async () => {
    try {
      const { data } = await postLogin(emailOrUsername, password);

      localStorage.setItem("token", data);
      nav("/");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };
  return (
    <LoginPageView
      error={error}
      emailOrUsername={emailOrUsername}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      handleSubmit={handleSubmit}
    />
  );
}
