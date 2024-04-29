import { apiClient } from './common';

export const authService = {
    signup: async (signupData: SignupFormData) => {
        const { data, error } = await apiClient.POST('/auth/signup', { body: signupData });
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    },
    login: async (loginData: LoginFormData) => {
        const { data, error } = await apiClient.POST('/auth/login', { body: loginData });
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    },
    logout: async () => {
        const { data, error } = await apiClient.DELETE('/auth/logout');
        if (data !== undefined) return data;
        throw (error as ResponseError).message;
    }
};
