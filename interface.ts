


export interface CreatePrinterDto {
  status: boolean;
  A3PaperCount: number;
  A4PaperCount: number;
  A5PaperCount: number;
  building: string;
  floor: number;
  room: number;
  brand: string
  model: string
}

export interface UpdatePrinter {
  id: string;
  status?: boolean;
  A3PaperCount?: number;
  A4PaperCount?: number;
  A5PaperCount?: number;
  building?: string;
  floor?: number;
  room?: number;
  brand?: string;
  model?: string;
}

export interface UpdatePaperAfterPrintingDto {
  id: string;
  A3PaperCount?: number;
  A4PaperCount?: number;
  A5PaperCount?: number;
}

export enum UserRole {
  ADMIN = "Quản trị viên",
  STUDENT = "Học viên"
}

export enum FileType {
  PDF = "application/pdf",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}


export interface CreateUserDto {
  password: string
  username: string
  name: string
  email: string
  phoneNumber: string
  role: UserRole

}

export interface CreateSystemConfigDto {
  historyClearTime: Date;
  allowedFiles: FileType[];
  freePaperResetDate: Date;
  defaultFreePaper: number;
}

export interface updateSystemConfigDto {
  versionId: string;
  historyClearTime?: Date;
  allowFile?: string[];
  freePaperResetDate?: Date;
  defaultPaper?: number;
}

export interface GetCountDto {
  id?: number;
  status?: number; // 0 hoặc 1
  A3CountPaper?: number;
  A4CountPaper?: number;
  A5CountPaper?: number;
  brand?: string;
  model?: string;
  building?: string;
  floor?: string;
  room?: string;
}

export interface GetPrinterToPrintDto {
  A3CountPaper?: number;
  A4CountPaper?: number;
  A5CountPaper?: number;
}

export interface LoginInfoDto {
  username: string;
  password: string;
}

export interface SearchAvailableDto {
  A3Require: number
  A4Require: number
  A5Require: number
}

export interface SearchPayload {
  criteria: SearchCriteria[],
  addition: SearchAddition
}

export interface SearchAddition {
  sort: [string, 'ASC' | 'DESC'][],
  page: number,
  size: number,
  group: string[]
}
export interface SearchCriteria {
  field: string;
  operator: '~' | '!~' | '=' | '!=' | 'isSet' | 'isNotSet' | '<' | '<=' | '>' | '>=';
  value?: any;
}


export interface PrintDataI {
  fileId: number
  pageSize: string; 
  copies: number;
}

export interface PrintFileDto {
  printDataList: PrintDataI[]
}

export interface ListResponse {
  acceptedList: number[]
  unAcceptedList: number[]
}

export interface CreatePayemntDto {
  studentId: number;
  comboType: String;
  numberCombo: number;
} 