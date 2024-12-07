import axios from "axios";

const API_URL = "http://localhost:4000/api"; // Base URL

// Get User Profile
export const getUserProfile = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/user/v1/getmyprofile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Logout User
export const logoutUser = async (token: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/v1/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// show all users
export const getAllUsers = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/admin/v1/allusers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// get all tasks
export const getAllTasks = async (token: string) => {
  try {
    const res = await axios.get(`${API_URL}/admin/v1/alltasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
};

// delete user
export const deleteUserAdmin = async (token: string, id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/admin/v1/deleteuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// change user role

export const changeRole = async (token: string, userId: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/admin/v1/makeadmin`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error changing user role:", error);
  }
};
