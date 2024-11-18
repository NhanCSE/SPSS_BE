import { Inject, Injectable } from "@nestjs/common";
import { ADMIN_REPOSITORY, STUDENT_REPOSITORY, USER_REPOSITORY } from "src/common/contants";
// import { CreatePrinterDto } from "../dtos/create-printer.dtos";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/createUser.dto";
import { Student } from "../entities/student.entity";
import { Admin } from "../entities/admin.entity";


@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(STUDENT_REPOSITORY) private readonly studentRepository: typeof Student,
    @Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin,

  ) { };


  async create(payload: CreateUserDto) {

    const user = await this.userRepository.create({
      phone: payload.phoneNumber,
      password: payload.password,
      username: payload.username,
      name: payload.name,
      email: payload.email,
      role: payload.role
    });

    if (payload.role == 'STUDENT') {
      const student = await this.studentRepository.create({
        sso_id: user['sso_id'],
        bought_paper: 0,
        current_free_paper: 0
      });
    }

    return user;
  }

  async decreasePage(student_id: number, pageNumber: number) {
    try {

      const student = await this.studentRepository.findOne({
        where: {
          sso_id: student_id
        }
      })

      if (student['bought_paper'] > 0 && student['bought_paper'] > pageNumber) {
        student.bought_paper = student['bought_paper'] - pageNumber;
        student.save();
        return true;
      }
      else if (student['current_free_paper'] > 0 && student['current_free_paper'] > pageNumber) {
        student.current_free_paper = student['current_free_paper'] - pageNumber;
        student.save();
        return true;
      }

      return false;
    }
    catch (error) {
      console.log(error);
    }

  }

  async getBalance(student_id: number) {
    const student = await this.studentRepository.findOne({
      where: {
        sso_id: student_id
      }
    })

    const paper = {
      "bought_paper": student['bought_paper'],
      "free_paper": student['current_free_paper']
    }
    return paper;
  }

  async getUser(student_id: number) {
    const user = await this.userRepository.findOne({
      where: {
        sso_id: student_id
      }
    })

    const student = await this.userRepository.findOne({
      where: {
        sso_id: student_id
      }
    })

    return [student, user];

  }

}