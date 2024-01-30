import axios from "axios";
import { apiBase } from "../../settings";

export async function getProfiles() {
    return (await axios.get(`${apiBase}/posts`)).data;
}

export async function getUsers() {
    return (await axios.get(`${apiBase}/users`)).data;
}

export async function editUser(id: string, user:any) {
    return (await axios.put(`${apiBase}/users/${id}/edit`, user)).data;
}

export async function addUser(user:any) {
    return (await axios.post(`${apiBase}/users`, user)).data;
}

export async function deleteUser(id: string) {
    return (await axios.delete(`${apiBase}/users/${id}/delete`)).data;
}

export async function questionGPT(message: string) {
    return (await axios.post(`${apiBase}/gpt`, {message: message})).data;
}