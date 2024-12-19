import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^\+[1-9]\d{1,14}$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid phone number`;
        },
      },
    });
  };
}

export function IsVerificationCode(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isVerificationCode',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^\d{6}$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a 6-digit number`;
        },
      },
    });
  };
}