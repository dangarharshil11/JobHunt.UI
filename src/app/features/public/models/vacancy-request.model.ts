export interface VacancyRequest{
    publishedBy: string;
    publishedDate: Date;
    noOfVacancies: number;
    minimumQualification: string;
    jobTitle: string;
    jobDescription: string;
    experienceRequired: string;
    lastDate: Date;
    minimumSalary: number;
    maximumSalary: number;
}