import { useState } from "react";
import LoginPageView from "./view";
import { postLogin } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const nav = useNavigate();

  const onEmailChange = (e) => {
    setEmailOrUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const fetchLogin = async () => {
    try {
      const { data } = await postLogin(emailOrUsername, password);

      localStorage.setItem("token", data);
      nav("/");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been successfully logged in!",
      });
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Woi",
      });
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
      isPasswordVisible={isPasswordVisible}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
}
