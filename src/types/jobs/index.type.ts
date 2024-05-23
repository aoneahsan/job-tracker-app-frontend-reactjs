/**
 * Enums
 */
export enum ZJobStatusEnum {
    bookmarked = 'bookmarked',
    applying = 'applying',
    applied = 'applied',
    interviewing = 'interviewing',
    negotiating = 'negotiating',
    accepted = 'accepted',
}

export enum ZJobPeriodEnum {
    hourly = 'hourly',
    weekly = 'weekly',
    monthly = 'monthly',
    yearly = 'yearly'
}

export enum ZJobsTableColumnsIds {
    id = '__z_job_id__',
    title = '__z_job_title__',
    urlForOriginalPosting = '__z_job_url_for_original_posting__',
    companyName = '__z_job_companyName__',
    description = '__z_job_description__',
    url = '__z_job_target_url__',
    platform = '__z_job_platform__',
    location = '__z_job_location__',
    minSalary = '__z_job_min_salary__',
    maxSalary = '__z_job_min_salary__',
    currency = '__z_job_currency__',
    salaryPayPeriod = '__z_job_salary_pay_period__',
    postedDate = '__z_job_posted_date__',
    savedDate = '__z_job_save_date__',
    appliedDate = '__z_job_applied_date__',
    followUpDate = '__z_job_follow_date__',
    status = '__z_job_status__',
    excitement = '__z_job_excitement__',
    actions = '__z_job_actions__',
}

/**
 *  Interfaces
 */

export interface jobStatusInterface {
    currentStatus: ZJobStatusEnum;
    bookmarked: {
        reviewJobPositionDetails: boolean;
    };
    applying: {
        getReferral: boolean;
        customizeResume: boolean;
        // writeCoverLetter: boolean;
        identifyHiringManager: boolean;
        submitApplication: boolean;
    };
    applied: {
        followUpOnJobApplications: boolean;
    },
    interviewing: {
        researchAndPrepare: boolean;
        practiceInterviewing: boolean;
        testYourTechVirtualOnly: boolean;
        followUp: boolean;
    },
    negotiating: {
        researchYourTargets: boolean;
        prepareForNegotiations: boolean;
        evaluateAnOffer: boolean;
    }
}
export interface ZJobI {
    id?: string;
    title?: string;
    companyName?: string;
    description?: string;
    urlForOriginalPosting?: string;
    platform?: string;
    location?: string;
    salary?: {
        min?: number;
        max?: number;
        currency?: string;
        period?: string;
    };
    salaryPayPeriod?: string;
    postedDate?: string;
    status: jobStatusInterface;
    savedDate?: string;
    appliedDate?: string;
    followUpDate?: string;
    excitement?: string | number;

    // For frontend only
    actions?: string;
}

export interface jobGuidanceItem { enabled: boolean, text: string, link: string };

export interface jobGuidanceList { enabled: boolean, value: string, label: string, items: Array<jobGuidanceItem> }
export interface ZJobGuidance {
    id?: string;
    value: string;
    list: Array<jobGuidanceList>
}