import { axiosInstance } from ".";

export const AddEpisode = async (episodeData) => {
  try {
    const response = await axiosInstance.post('/api/episode/add-episode', episodeData);
    return response.data;
  } catch (err) {
    console.error('API call error:', err);
    return err.response ? err.response.data : { success: false, message: 'Network error' };
  }
};

export const GetAllEpisodesOfProject = async (projectId) => {
    try {
      const response = await axiosInstance.get(`/api/episode/get-all-episodes-by-projectId`, {
        params: { projectId } });
         return response.data;
    } catch (error) {
      console.error('An error occurred while fetching the episodes:', error);
      return { success: false, message: 'An error occurred' };
    }
  };

  export const GetEpisodeById = async (episodeId) => {
    try {
        const response = await axiosInstance.get('api/episode/get-episode-by-episodeId', {
            params: { episodeId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching episode:', error);
        throw error;
    }
};

  export const editEpisode = async(episodeId,updatedData)=>{
    try{
      const response = await axiosInstance.put('api/episode/edit-episode',updatedData,{
        params:{episodeId}
      })
      return response.data
    }catch(error){
      console.error('Error updating episode:', error);
        throw error;
    }
  }

  export const DeleteEpisode = async (episodeId) => {
    try {
      const response = await axiosInstance.delete(`/api/episode/delete-episode-by-Id`,{
        params:{episodeId}
      });
      return response.data; 
    } catch (error) {
      console.error('Error deleting episode:', error);
      return { success: false, message: 'Failed to delete episode' };
    }
  };








