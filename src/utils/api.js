import axios from "axios";

function getToken() {
  return localStorage.getItem("token");
}

const postLogin = async (emailOrUsername, password) => {
  const response = await axios({
    method: "POST",
    url: "https://kyra.yubenbauty.site/login",
    data: { emailOrUsername, password },
  });

  return response;
};

const postRegister = async (email, username, password) => {
  const response = await axios({
    method: "POST",
    url: "https://kyra.yubenbauty.site/register",
    data: { email, username, password },
  });

  return response;
};

const getUser = async () => {
  const response = await axios({
    method: "GET",
    url: "https://kyra.yubenbauty.site/user",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const getAllUser = async () => {
  const response = await axios({
    method: "GET",
    url: "https://kyra.yubenbauty.site/user/all",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response;
};

const getNewMessage = async () => {
  return await axios({
    method: "GET",
    url: "https://kyra.yubenbauty.site/message",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const putProfile = async (fullName, profilePicture) => {
  return await axios({
    method: "PUT",
    url: "https://kyra.yubenbauty.site/profile",
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
