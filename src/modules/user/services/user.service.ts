import { Inject, Injectable } from "@nestjs/common";
import { ADMIN_REPOSITORY, STUDENT_REPOSITORY, USER_REPOSITORY, UserRole } from "src/common/contants";
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

    if (payload.role == UserRole.STUDENT) {
      await this.studentRepository.create({
        ssoId: user['ssoId'],
        boughtPaper: 0,
        currentFreePaper: 0
      });
    } else if(payload.role == UserRole.ADMIN) {
      await this.adminRepository.create({
        ssoId: user['ssoId'],
        lastLogin: new Date()
      });
    }

    return user;
  }

  async decreasePage(studentId: number, pageNumber: number) {
    try {

      const student = await this.studentRepository.findOne({
        where: {
          ssoId: studentId
        }
      })


      const freePaperDec = Math.min(student.currentFreePaper, pageNumber);
      pageNumber -= freePaperDec;

      const boughtPaperDec = Math.min(student.boughtPaper, pageNumber);
      pageNumber -= boughtPaperDec;

      if(pageNumber > 0) {
        return false;
      }

      student.currentFreePaper -= freePaperDec;
      student.boughtPaper -= boughtPaperDec;
      student.save();


      return true;
    }
    catch (error) {
      console.log(error);
    }

  }

  async getBalance(studentId: number) {
    const student = await this.studentRepository.findOne({
      where: {
        ssoId: studentId
      },
      attributes: ["currentFreePaper", "boughtPaper"]
    })

    return student;
  }

  async getUser(studentId: number) {
    const user = await this.userRepository.findOne({
      where: {
        ssoId: studentId
      }
    })

    const student = await this.userRepository.findOne({
      where: {
        ssoId: studentId
      }
    })

    return [student, user];

  }

}