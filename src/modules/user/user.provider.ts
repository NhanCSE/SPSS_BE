import { ADMIN_REPOSITORY, STUDENT_REPOSITORY, USER_REPOSITORY } from "src/common/contants";
import { User } from "./entities/user.entity";
import { Student } from "./entities/student.entity";
import { Admin } from "./entities/admin.entity";

export const UserProviders = [{
  provide: USER_REPOSITORY,
  useValue: User
},
{
  provide: STUDENT_REPOSITORY,
  useValue: Student
},
{
  provide: ADMIN_REPOSITORY,
  useValue: Admin
}]