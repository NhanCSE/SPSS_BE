import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEnumKeyConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: any) {
    const [enumType] = args.constraints;
    // Check if the value exists as a key in the enum
    return Object.keys(enumType).includes(value);
  }

  defaultMessage() {
    return 'Data is not valid';
  }
}

export function IsEnumKey(
  enumType: object,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [enumType],
      validator: IsEnumKeyConstraint,
    });
  };
}
