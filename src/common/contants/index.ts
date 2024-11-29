export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const APP_FILTER = 'APP_FILTER';

// Repository constant
export const PRINTER_REPOSITORY = "PRINTER_REPOSITORY"
export const LOCATION_REPOSITORY = "LOCATION_REPOSITORY"
export const USER_REPOSITORY = "USER_REPOSITORY"
export const STUDENT_REPOSITORY = "STUDENT_REPOSITORY"
export const ADMIN_REPOSITORY = "ADMIN_REPOSITORY"
export const ERROR_HISTORY_REPOSITORY = "ERROR_HISTORY_REPOSITORY"
export const PRINTING_HISTORY_REPOSITORY = "PRINTING_HISTORY_REPOSITORY"
export const SYS_CONFIG_HISTORY_REPOSITORY = "SYS_CONFIG_HISTORY_REPOSITORY"
export const SYSTEM_CONFIGURATION_REPOSITORY = "SYSTEM_CONFIGURATION_REPOSITORY"
export const TRANSACTION_REPOSITORY = "TRANSACTION_REPOSITORY"
export const PAPER_REPORT_REPOSITORY = " PAPER_REPORT_REPOSITORY"
export const PAYMENT_REPORT_REPOSITORY = "PAYMENT_REPORT_REPOSITORY"
export const FILE_REPOSITORY = "FILE_REPOSITORY"
export const PAYMENT_REPOSITORY = "PAYMENT_REPOSITORY"


export enum UserRole {
    ADMIN = "Quản trị viên",
    STUDENT = "Học viên"
}

export enum FileType {
    PDF = "application/pdf",
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}