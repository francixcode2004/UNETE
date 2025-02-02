import axios from "axios";
const API_URL = "http://localhost:3000/api";
// Función para iniciar sesión
export async function login(user, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, { 
            username:user,
            password:password }
        );
        const { token, role } = response.data;
        return { success: true, token, role };
    } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data?.error || error.message);
        return { success: false, error: error.response?.data?.error || "Error al conectar con el servidor" };
    }
}
// Función para registar usuario
export async function register(user, password) {
    try {
        const response = await axios.post(`${API_URL}/register`, { 
            username:user,
            password:password }
        );
        const { username, message } = response.data;
        return { success: true, username, message };
    } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data?.error || error.message);
        return { success: false, error: error.response?.data?.error || "Error al conectar con el servidor" };
    }
}
// Función para cerrar sesión
export async function logout() {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        const {message}=response.data
        localStorage.removeItem("auth")
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return { success: true, message };
    } catch (error) {
        console.error("Error al cerrar sesión:", error.response?.data?.error || error.message);
        return { success: false, error: error.response?.data?.error || "Error al conectar con el servidor" };
    }
}