/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

// async function main() {
//   const passwordAdmin = await bcrypt.hash('password-admin', roundsOfHashing);
// }
