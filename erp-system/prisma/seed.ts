import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.create({
    data: {
      name: 'Test Company',
    },
  });

  const hashedPassword = await bcrypt.hash('password', 10);

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
