import axios from "axios";

function getToken() {
  return localStorage.getItem("token");
}

const postLogin = async (emailOrUsername, password) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:3000/login",
    data: { emailOrUsername, password },
  });

  return response;
};

const postRegister = async (email, username, password) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:3000/register",
    data: { email, username, password },
  });

  return response;
};

const getUser = async () => {
  const response = await axios({
    method: "GET",
    url: "http://localhost:3000/user",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const getAllUser = async () => {
  const response = await axios({
    method: "GET",
    url: "http://localhost:3000/user/all",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const getNewMessage = async () => {
  return await axios({
    method: "GET",
    url: "http://localhost:3000/message",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const putProfile = async (fullName, profilePicture) => {
  return await axios({
    method: "PUT",
    url: "http://localhost:3000/profile",
    data: { fullName, profilePicture },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export {
  postLogin,
  postRegister,
  getUser,
  getAllUser,
  getNewMessage,
  putProfile,
};
