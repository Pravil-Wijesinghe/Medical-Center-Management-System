import api from './api';

// Upload Profile Picture
export const uploadProfilePicture = (profilePicture) => {
  const formData = new FormData();
  formData.append('profilePicture', profilePicture);
  return api.post('/upload/profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get Profile Picture
export const getProfilePicture = (filename) => {
  return api.get(`/profile/${filename}`, {
    responseType: 'blob', // Important for handling binary data like images
  });
};