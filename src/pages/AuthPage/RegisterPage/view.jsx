import { Link } from "react-router-dom";

export default function RegisterPageView({
  email,
  username,
  password,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  handleSubmit,
}) {
  return (
    <div>
      <h1 className="text-3xl text-red-600">
        EDIT REGISTER DISINI YA AXELLLLLLLLL
      </h1>

      {/* Ini buat redirect ke login */}
      <Link to="/login" className="text-blue-500">
        Already have an account?
      </Link>

      {/* Pake button yang ini buat submit register */}
      <button onClick={handleSubmit} className="bg-red-500">
        Register
      </button>
    </div>
  );
}
