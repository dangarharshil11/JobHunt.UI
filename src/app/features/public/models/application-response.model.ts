import { VacancyResponse } from "./vacancy-response.model";

export interface ApplicationResponse{
    id: string;
    vacancyId: string;
    vacancy: VacancyResponse;
    userId: string;
    appliedDate: Date;
}