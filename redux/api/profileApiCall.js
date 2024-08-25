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
      toast.error(error?.response?.data?.message);
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
      toast.error(error?.response?.data?.message);
    }
  };
}

//~ Update profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      //! Modify the new user
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

//~ Delete profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(`تم حذف الحساب بنجاح`);

      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

//~ Get Users Count [for admin dashboard]
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      console.log("Users Count:", data.count); // عرض البيانات للتحقق
      dispatch(profileActions.setUsersCount(data.count)); // تمرير العدد بشكل صحيح
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

//~ get all users profiles
export function getAllUsersProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profiles`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setProfiles(data)); // التأكد من تمرير البيانات إلى الحالة
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}
