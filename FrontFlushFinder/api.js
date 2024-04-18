import axios from 'axios';



const API_URL_EDIFICIOS = 'http://192.168.100.18:5000/api/edificios/edificios';
const API_URL_LOGIN_CONSERJES = 'http://192.168.100.18:5000/api/conserjes/login';
const API_URL_CONSERJES = "http://192.168.100.18:5000/api/conserjes/conserjes";
const API_URL_REGISTRO = 'http://192.168.100.18:5000/api/users/register';
const API_URL_LOGIN = 'http://192.168.100.18:5000/api/users/login';
const API_URL_SOS = 'http://192.168.100.18:5000/api/sos/sos';



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


// Función para registrar un usuario
export const registrarUsuario = async (datosUsuario) => {
  try {
    const response = await axios.post(API_URL_REGISTRO, datosUsuario);
    // Retorna la respuesta del servidor, podría incluir datos del usuario, un mensaje de éxito, etc.
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
    throw error;
  }
};


// Función para iniciar sesión de un usuario
export const loginUsuario = async (credenciales) => {
  try {
    const response = await axios.post(API_URL_LOGIN, credenciales);
    // Retorna la respuesta del servidor, probablemente incluirá el token de autenticación
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión: ", error);
    throw error;
  }
};

export const loginConserje = async (credenciales) => {
  try {
    // Envía las credenciales al servidor
    const response = await axios.post(API_URL_LOGIN_CONSERJES, credenciales);
    return response.data;
  } catch (error) {
    console.error("Error en el login de conserje:", error.response ? error.response.data : error);
    throw error;
  }
};

export const getBanosDelEdificio = async (edificioId) => {
  const urlBanos = `http://192.168.100.18:5000/api/banos/edificios/${edificioId}/banos`;
  try {
    const response = await axios.get(urlBanos);
    return response.data;
  } catch (error) {
    console.error("Error al obtener baños del edificio:", error);
    throw error;
  }
};

export const getSOS = async () => {
  try {
    const response = await axios.get(API_URL_SOS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los SOS: ", error);
    throw error;
  }
};

export const borrarSOS = async (sosReportID) => {
  const urlBorrarSOS = `${API_URL_SOS}/${sosReportID}`;
  try {
    const response = await axios.delete(urlBorrarSOS);
    return response.data;
  } catch (error) {
    console.error("Error al borrar SOS: ", error);
    throw error;
  }
};

export const borrarTodosSOS = async () => {
  try {
    const response = await axios.delete(API_URL_SOS);
    return response.data;
  } catch (error) {
    console.error("Error al borrar todos los SOS: ", error);
    throw error;
  }
};