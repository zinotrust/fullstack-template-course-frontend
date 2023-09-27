import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Login with google
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + "google/callback", userToken, {
    withCredentials: true,
  });
  return response.data;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Get user profile
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// Update Photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatePhoto", userData);
  return response.data;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");
  return response.data;
};

// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

// Upgrade User
const changeUserRole = async (userData) => {
  const response = await axios.post(API_URL + "changeUserRole", userData);
  return response.data.message;
};

const authService = {
  loginWithGoogle,
  getLoginStatus,
  logout,
  getUser,
  updateUser,
  updatePhoto,
  getUsers,
  deleteUser,
  changeUserRole,
};

export default authService;
