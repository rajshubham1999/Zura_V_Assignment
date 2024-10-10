import { axiosInstance } from ".";

export const AddProject = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/project/add-project",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const GetAllProjectsByUser = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/project/get-all-projects-by-user"
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  
export const GetCurrentProject = async (projectName) => {
  console.log("projectName=>", projectName);
  try {
    const response = await axiosInstance.get(`/api/project/get-current-project`, {
      params: { projectName } 
    });
    return response.data;
  } catch (err) {
    console.error("API call error:", err);
    return err;
  }
};

export const UpdateProjectTime = async (projectData) => {
  try {
    const response = await axiosInstance.post("/api/project/update-project-time", projectData);
    return response.data;
  } catch (err) {
    console.error('API call error:', err);
    return err;
  }
};

  

