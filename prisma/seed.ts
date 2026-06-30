import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findFirst();

  if (!existingAdmin) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "Admin@2024!";
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: { username, password: hashedPassword },
    });

    console.log(`✅ Admin created: ${admin.username}`);
  } else {
    console.log("⚠️  Admin already exists, skipping seed.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
