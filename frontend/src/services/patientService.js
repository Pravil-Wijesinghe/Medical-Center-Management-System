import api from './api';

export const getPatientDetails = async (patientId) => {
  const { data } = await api.get(`/patients/details/${patientId}`);
  return data;
};

export const updatePatient = async (patientId, payload) => {
  const { data } = await api.put(`/patients/update/${patientId}`, payload);
  return data;
};


