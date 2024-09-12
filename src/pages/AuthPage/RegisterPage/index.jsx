import { useState } from "react";
import RegisterPageView from "./view";
import { postRegister } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const nav = useNavigate();

  const fetchRegister = async () => {
    try {
      const response = await postRegister(email, username, password);
      console.log(response);
      Swal.fire({
        title: "Success!",
        text: "Registration successful. Please log in.",
        icon: "success",
        confirmButtonText: "OK",
      });

      nav("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text:
          error.response.data.message || "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setError(error.response.data.message);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
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
      onConfirmPasswordChange={onConfirmPasswordChange}
      handleSubmit={handleSubmit}
      isPasswordVisible={isPasswordVisible}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
}
