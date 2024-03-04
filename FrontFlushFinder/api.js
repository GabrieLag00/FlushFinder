import axios from 'axios';

const API_URL_EDIFICIOS = 'http://10.10.50.76:4000/api/edificios/edificios';
const API_URL_CONSERJES = 'http://10.10.50.76:4000/api/conserjes/conserjes';

export const getEdificios = async () => {
  try {
    const response = await axios.get(API_URL_EDIFICIOS);
    return response.data; // Axios envuelve la respuesta en un objeto `data`.
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Lanza el error para manejarlo en otra parte si es necesario.
  }
};

export const getConserjes = async () => {
  try {
    const response = await axios.get(API_URL_CONSERJES);
    return response.data;
  } catch (error) {
   console.error("Error al hace el fetch de conserjes", error);
   throw error
  }
};

