import api from '../axios';
import { VoteOption } from '../types';

export const fetchCandidates = async (): Promise<VoteOption[]> => {
    const token = localStorage.getItem("token");

    const response = await api.get("user/candidates", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const voteService = async (candidateName: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token");

    const response = await api.post("user/vote", {
        candidateName
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};