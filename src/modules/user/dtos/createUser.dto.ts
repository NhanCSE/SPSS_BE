import { UserRole } from "src/common/contants"

export class CreateUserDto {
  password: string
  username: string
  name: string
  email: string
  phoneNumber: string
  role: UserRole
}