const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient({ url: process.env.DATABASE_URL });
console.log("Success");
