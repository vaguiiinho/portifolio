import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import type { IPasswordHasher } from '../../domain/services/i-password-hasher';

const scrypt = promisify(scryptCallback);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const [salt, storedHash] = hash.split(':');

  if (!salt || !storedHash) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const storedBuffer = Buffer.from(storedHash, 'hex');

  if (storedBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedBuffer, derivedKey);
}

@Injectable()
export class PasswordHasherService implements IPasswordHasher {
  hash(password: string): Promise<string> {
    return hashPassword(password);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return comparePassword(password, hash);
  }
}
