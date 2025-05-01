import api from '../axios';
import { User } from "@/lib/types";

export const loginService = async (email: string, password: string): Promise<{ user: User; token: string, message: string }> => {
    const response = await api.post('login', { email, password });
    return response.data;
};

export const registerService = async (username: string, email: string, password: string): Promise<{ user: User; token: string, message: string }> => {
    const response = await api.post('register', { name: username, email, password });
    return response.data;
};