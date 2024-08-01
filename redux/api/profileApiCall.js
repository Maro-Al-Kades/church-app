import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
import request from "@/utils/request";
import { profileActions } from "@/redux/slices/profileSlice";

//~ Get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//~ Upload profile photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/upload-profile-photo`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      //~ Modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;

      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//~ Update profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userID}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      //~ Modify the user in local storage with new username
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;

      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.data);
    }
  };
}
