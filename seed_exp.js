import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.experience.create({
        data: {
            role: 'MERN Stack Developer Intern',
            company: 'KONCPT AI',
            duration: '6 Months',
            description: 'Worked as a MERN stack developer intern. Contributed to building intelligent, full-stack architectures and working closely with React, Node.js, Express, and MongoDB to deliver robust applications.',
        }
    });

    console.log('Experience data seeded.');
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
