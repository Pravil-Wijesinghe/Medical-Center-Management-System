import api from './api';

export const getPatientAppointments = async (patientId) => {
  const { data } = await api.post('/appointments/list-patient', { patientId });
  return data;
};

export const bookAppointment = async (payload) => {
  const { data } = await api.post('/appointments/book', payload);
  return data;
};


