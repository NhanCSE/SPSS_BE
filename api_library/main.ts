import axios, { AxiosResponse } from 'axios'
import {
  createSystemConfigDto,
  CreatePrinterDto,
  UpdatePaperAfterPrintingDto,
  UpdatePrinter,
  printFileDto,
  CreateUserDto,
  GetCountDto,
  GetPrinterToPrintDto,
  LoginInfoDto
} from './interface'


export class SystemConfiguration {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/systemConfiguration";
  }

  async createSystemConfiguration(createInfo: createSystemConfigDto, token: string) {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, createInfo, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }

  }

  async getAllSystemConfiguration(token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/searchAll`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }

  }

  async getNewestSystemConfiguration(token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/searchNewest`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }

  }

}

export class Printer {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/printer"
  }

  async createPrinter(createPrinterInfo: CreatePrinterDto, token: string) {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, createPrinterInfo, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }


  async searchPrinter(token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/search`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }


  async updatePaperAfterPrinting(updateInfo: UpdatePaperAfterPrintingDto, token: string) {
    try {
      const response: AxiosResponse = await axios.put(`${this.baseUrl}/update-paper-after-printing`, updateInfo, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }


  async updatePrinter(updateInfo: UpdatePrinter, token: string) {
    try {
      const response: AxiosResponse = await axios.put(`${this.baseUrl}/update`, updateInfo, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }


  async getNumberOfPrinter(payload: GetCountDto, token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/count`, {
        params: payload,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

  async getPrinterToPrint(payload: GetPrinterToPrintDto, token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/searchToPrint`, {
        params: payload,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

  async deletePrinter(printer_id: number, token: string) {
    try {
      const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete`, {
        params: {
          id: printer_id
        },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

}

export class FileOperation {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/file"
  }

  async uploadFile(fileUpload: File, printInfo: printFileDto, token: string) {
    try {
      const formData = new FormData();
      formData.append('file', fileUpload);

      const response: AxiosResponse = await axios.post(`${this.baseUrl}`, printInfo, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

  async getFile(fileId: string, token: string) {
    try {

      const response: AxiosResponse = await axios.get(`${this.baseUrl}/${fileId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }


}

export class History {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/printingHistory"
  }

  async viewPrintingHistory(student_id: string, token: string) {
    try {

      const response: AxiosResponse = await axios.get(`${this.baseUrl}/view/${student_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

}

export class User {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/user";
  }

  async createUser(createInfo: CreateUserDto, token: string) {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, createInfo, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }


  async getPaper(student_id: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/paper/search/${student_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

  async getInfo(student_id: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/search/${student_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }
}

export class Payment {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/payment"
  }

  async viewPayment(student_id: string, token: string) {
    try {

      const response: AxiosResponse = await axios.get(`${this.baseUrl}/view/${student_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }
}

export class Auth {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/v1/auth"
  }

  async login(payload: LoginInfoDto) {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseUrl}/login`, payload)

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }

  async signup(createInfo: CreateUserDto) {
    try {
      const response: AxiosResponse = await axios.post(`${this.baseUrl}/signup`, createInfo)

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status
      };
    }
    catch (error) {
      return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };

    }
  }
}