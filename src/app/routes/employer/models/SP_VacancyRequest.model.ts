export interface SP_VacancyRequestDto{
    searchText?: string;
    sortCoumnName?: string
    sortCoumnDirection?: string;
    startIndex?: number;
    pageSize?: number;
    vacancyId?: string; 
    fullName?: string; 
    email?: string;
    fromDate?: string
    toDate?: string;
    applicationStatus?: string;
}