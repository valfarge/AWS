import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{}>;

export interface UserCreateInput extends Omit<Prisma.UserCreateInput, 'verificationCode' | 'isVerified'> {
  password: string;
}

export interface UserUpdateInput extends Partial<Omit<UserCreateInput, 'password'>> {
  isVerified?: boolean;
  verificationCode?: string | null;
}