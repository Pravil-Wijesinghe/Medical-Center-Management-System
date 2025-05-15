import api from './api';

// Add a new doctor
export const addDoctor = (doctorData) => api.post('/doctors/add', doctorData);

// Get doctor details by ID
export const getDoctorDetails = (doctorId) => api.get(`/doctors/details/${doctorId}`);

// Get list of doctors with pagination, search, and soft-delete filter
export const getDoctorList = (filterData) => api.post('/doctors/list', filterData);

// Update doctor by ID
export const updateDoctor = (doctorId, updatedData) =>
  api.put(`/doctors/update/${doctorId}`, updatedData);

// Delete doctor by ID
export const deleteDoctor = (doctorId) => api.delete(`/doctors/delete/${doctorId}`);

// Add available time for a doctor
export const addAvailableTime = (timeData) =>
  api.post('/doctors/addAvailableTime', timeData);

// Get doctor count
export const getDoctorCount = () => api.get('/doctors/count');