export interface LoginResponse{
    userId: string;
    fullName: string;
    email: string;
    token: string;
    roles: string[];
}