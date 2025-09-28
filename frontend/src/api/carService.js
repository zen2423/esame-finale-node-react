import client from './client';

export const getCars = (filters = {}) => {
  const { year, maxPrice, edition } = filters;
  const params = new URLSearchParams();
  
  if (year) params.append('year', year);
  if (maxPrice) params.append('maxPrice', maxPrice);
  if (edition) params.append('edition', edition);
  
  return client.get(`/cars?${params.toString()}`);
};

export const getCarById = (id) => {
  return client.get(`/cars/${id}`);
};

export const compareCars = (carIds) => {
  if (!Array.isArray(carIds) || carIds.length < 2 || carIds.length > 3) {
    return Promise.reject(new Error('You must provide between 2 and 3 car IDs to compare'));
  }
  return client.get(`/cars/compare?ids=${carIds.join(',')}`);
};

export const sendContactMessage = (data) => {
  return client.post('/contact', data);
};
