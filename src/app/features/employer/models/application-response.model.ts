import { User } from "./user.model";
import { VacancyResponse } from "./vacancy-response.model";

export interface ApplicationResponse{
    id: string;
    vacancyId: string;
    vacancy: VacancyResponse;
    user: User;
    userId: string;
    appliedDate: Date;
}