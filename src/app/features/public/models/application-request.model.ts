import { VacancyResponse } from "./vacancy-response.model";

export interface ApplicationRequest{
    vacancyId: string;
    vacancy?: VacancyResponse;
    userId: string;
    appliedDate: Date;
}