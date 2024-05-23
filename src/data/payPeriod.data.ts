import { ZJobPeriodEnum } from "@/types/jobs/index.type";

const payPeriod = [
    { value: ZJobPeriodEnum.hourly, label: 'Hourly' },
    { value: ZJobPeriodEnum.weekly, label: 'Weekly' },
    { value: ZJobPeriodEnum.monthly, label: 'Monthly' },
    { value: ZJobPeriodEnum.yearly, label: 'Yearly' }
];

export default payPeriod;
