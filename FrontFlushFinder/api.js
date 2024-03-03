import axios from 'axios';

const API_URL = 'http://192.168.100.8:4000/api/edificios/edificios';

export const getEdificios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Axios envuelve la respuesta en un objeto `data`.
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Lanza el error para manejarlo en otra parte si es necesario.
  }
};
