

export interface printFileDto {  // chọn cấu hình trước khi in
  student_id: number;
  printer_id: number;
  copies: number;
  file_id: number;
  page_print: number;
  date: Date;
  page_size: string;
  filenames: string;
}

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


export interface CreateUserDto {
  password: string
  username: string
  name: string
  email: string
  phoneNumber: string
  role: UserRole

}

export interface createSystemConfigDto {
  historyClearTime: Date;
  allowFile: string[];
  freePaperResetDate: Date;
  defaultPaper: number;
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