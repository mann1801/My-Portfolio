import { prisma } from './lib/prisma';

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
    process.exit(0);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
