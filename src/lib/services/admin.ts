import api from '../axios';
import { User, VoteOption } from '../types';

export const voteStatService = async (): Promise<VoteOption[]> => {
    const token = localStorage.getItem("token");

    const response = await api.get("admin/candidates", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createCandidate = async (name: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");

    const response = await api.post("admin/candidates", {
            name
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteCandidate = async (id: string): Promise<any> => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`admin/candidates/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
    const token = localStorage.getItem("token");

    const response = await api.get("admin/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const deleteUser = async (id: string): Promise<any> => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const changeRole = async (userId: string, roleName: string): Promise<any> => {
    const token = localStorage.getItem("token");

    const response = await api.put("admin/users/role", {
            userId,
            roleName
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};