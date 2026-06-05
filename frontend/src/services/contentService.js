import http from './http';

const formHeaders = { headers: { 'Content-Type': 'multipart/form-data' } };
const withLibraryPageSize = (params = {}) => ({ page_size: 100, ...params });

export const contentService = {
  getLectures: async (params = {}) => (await http.get('/lectures/', { params: withLibraryPageSize(params) })).data,
  getPracticals: async (params = {}) => (await http.get('/practicals/', { params: withLibraryPageSize(params) })).data,
  getBooks: async (params = {}) => (await http.get('/books/', { params: withLibraryPageSize(params) })).data,
  uploadLecture: async (formData) => (await http.post('/lectures/', formData, formHeaders)).data,
  uploadPractical: async (formData) => (await http.post('/practicals/', formData, formHeaders)).data,
  uploadBook: async (formData) => (await http.post('/books/', formData, formHeaders)).data,
};
