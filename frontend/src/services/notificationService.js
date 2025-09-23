import api from './api';

export const getNotificationsByUser = async (userId) => {
  const { data } = await api.get(`/notifications/user/${userId}`);
  return data;
};

export const markNotificationAsRead = async (notificationId) => {
  const { data } = await api.put(`/notifications/mark-read/${notificationId}`);
  return data;
};


