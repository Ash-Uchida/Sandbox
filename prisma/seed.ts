import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demo = await prisma.user.upsert({
    where: { email: "demo@briefcaseos.test" },
    update: {},
    create: { email: "demo@briefcaseos.test", name: "Demo Counselor" },
  });

  const existing = await prisma.contract.count({ where: { ownerId: demo.id } });
  if (existing === 0) {
    await prisma.contract.createMany({
      data: [
        {
          ownerId: demo.id,
          name: "Master Service Agreement - Alpha",
          clientId: "C-7842",
          status: "compliant",
          complianceScore: 94,
          renewalDate: new Date("2024-10-29"),
          createdAt: new Date("2023-10-24"),
        },
        {
          ownerId: demo.id,
          name: "Lease Addendum - Tech Park",
          clientId: "C-9011",
          status: "at_risk",
          complianceScore: 62,
          createdAt: new Date("2023-10-22"),
        },
        {
          ownerId: demo.id,
          name: "Non-Disclosure Agreement - Beta",
          clientId: "C-1256",
          status: "compliant",
          complianceScore: 98,
          createdAt: new Date("2023-10-21"),
        },
        {
          ownerId: demo.id,
          name: "Vendor Privacy Policy",
          clientId: "V-0043",
          status: "pending",
          createdAt: new Date("2023-10-19"),
        },
      ],
    });
    console.log(`Seeded 4 contracts for ${demo.email}`);
  } else {
    console.log(`Skipped seeding — ${demo.email} already has ${existing} contracts`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
