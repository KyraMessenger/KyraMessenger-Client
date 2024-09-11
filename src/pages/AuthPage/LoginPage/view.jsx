import { Link } from "react-router-dom";
import kyraLogo from "../../../assets/kyra.png";
import loginIllustrator from "../../../assets/kyra_1.gif";
import backgroundVideo from "../../../assets/test.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginPageView({
  emailOrUsername,
  password,
  onEmailChange,
  onPasswordChange,
  handleSubmit,
  error,
  isPasswordVisible,
  togglePasswordVisibility,
}) {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <img
        src={backgroundVideo}
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />

      <div className="relative z-10 flex items-center justify-center px-6 py-8 mx-auto h-full bg-black bg-opacity-50">
        <div className="flex flex-col md:flex-row bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 w-full max-w-4xl">
          <div className="hidden md:flex items-center justify-center w-full md:w-1/2 dark:bg-gray-900 p-6">
            <img
              className="w-full h-auto object-contain"
              src={loginIllustrator}
              alt="Login Illustration"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-8">
            <div className="flex justify-center mb-4">
              <img className="w-40" src={kyraLogo} alt="logo" />
            </div>
            <div className="w-full space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                Sign in to your account
              </h1>
              {error && (
                <p className="text-red-300 bg-red-500 bg-opacity-30 p-2">
                  {error}
                </p>
              )}
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-200"
                  >
                    Your email or username
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={emailOrUsername}
                    onChange={onEmailChange}
                    className="bg-gray-800 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com or username"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                    className="bg-gray-800 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-12 right-4 flex items-center text-gray-300"
                  >
                    <FontAwesomeIcon
                      icon={isPasswordVisible ? faEye : faEyeSlash}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between"></div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-gray-900 bg-purple-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
