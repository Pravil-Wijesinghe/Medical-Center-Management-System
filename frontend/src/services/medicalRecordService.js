import api from './api';

export const searchMedicalRecords = async (filters) => {
  const { data } = await api.post('/medical-records/search', filters);
  return data;
};

export const getMedicalRecordById = async (recordId) => {
  const { data } = await api.get(`/medical-records/${recordId}`);
  return data;
};


