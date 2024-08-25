import { projectActions } from "@/redux/slices/projectSlice";
import { toast } from "react-toastify";
import request from "@/utils/request";

// Fetch Projects based on page number
export function fetchProjects(pageNumber) {
  return async (dispatch) => {
    dispatch(projectActions.setLoading(true));
    try {
      const { data } = await request.get(
        `/api/projects?pageNumber=${pageNumber}`
      );
      dispatch(projectActions.setProjects(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    } finally {
      dispatch(projectActions.setLoading(false));
    }
  };
}

// Fetch All Projects
export function getAllProjects() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/projects`);
      dispatch(projectActions.setProjects(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
    }
  };
}

// Fetch All Categories
export function fetchCategories() {
  return async (dispatch) => {
    dispatch(projectActions.setLoading(true));
    try {
      const { data } = await request.get(`/api/categories`);
      dispatch(projectActions.setCategories(data.categories || []));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    } finally {
      dispatch(projectActions.setLoading(false));
    }
  };
}

// Get Projects Count
export function getProjectsCount() {
  return async (dispatch) => {
    dispatch(projectActions.setLoading(true));
    try {
      const { data } = await request.get(`/api/projects/count`);
      dispatch(projectActions.setProjectsCount(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    } finally {
      dispatch(projectActions.setLoading(false));
    }
  };
}

// Fetch Projects based on Category
export function fetchProjectsBasedOnCategory(categoryId) {
  return async (dispatch) => {
    dispatch(projectActions.setLoading(true));
    try {
      const { data } = await request.get(`/api/categories/${categoryId}`);
      dispatch(projectActions.setProjectCate(data.projects));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    } finally {
      dispatch(projectActions.setLoading(false));
    }
  };
}

// Create New Project
export function createProject(newProject) {
  return async (dispatch, getState) => {
    try {
      dispatch(projectActions.setLoading(true));
      await request.post("/api/projects", newProject, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(projectActions.setIsProjectCreated());
      setTimeout(() => dispatch(projectActions.clearIsProjectCreated()), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    } finally {
      dispatch(projectActions.setLoading(false));
    }
  };
}

// Fetch Single Project
export function fetchSingleProject(projectId) {
  return async (dispatch) => {
    dispatch(projectActions.setLoading(true));
    try {
      const { data } = await request.get(`/api/projects/${projectId}`);
      dispatch(projectActions.setProject(data.project));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    } finally {
      dispatch(projectActions.setLoading(false));
    }
  };
}

// Toggle Like Projects button
export function projectToggleLike(projectId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/projects/like/${projectId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(projectActions.setLikes(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    }
  };
}

// Update Project Image
export function updateProjectImage(newImage, projectId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/projects/update-image/${projectId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("تم تغيير الصورة بنجاح");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    }
  };
}

// Update Project
export function updateProject(newProject, projectId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/projects/${projectId}`,
        newProject,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(projectActions.setProject(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
      dispatch(projectActions.setError(errorMessage));
    }
  };
}

// Delete Project
export function deleteProject(projectId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/projects/${projectId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(projectActions.deleteProject(data.projectId));

      toast.success(data.message);
    } catch (error) {}
  };
}
