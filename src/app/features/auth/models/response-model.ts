import { LoginResponse } from "./login-response.model";

export interface Response{
    result?: LoginResponse;
    isSuccess: boolean;
    message: string;
}