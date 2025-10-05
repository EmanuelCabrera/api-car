const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();


async function userSeed() {
  const password = await hashPassword("1234");
  try {
    await prisma.User.createMany({
      data: [
        {name:"admin", surname:"",email:"admin@admin.com",role:"Admin",password:password},
        {name:"manager", surname:"",email:"manager@admin.com",role:"Manager",password:password},
        {name:"custumer", surname:"",email:"custumer@admin.com",role:"Custumer",password:password}
      ],
    });
    await prisma.Brand.createMany({
      data:[
          {name:"Nissan"},
          {name:"Ford"},
          {name:"Chevrolet"},
          {name:"Fiat"}
      ]
    });
    await prisma.Car.createMany({
      data:[
          {name:"Sentra",brandId:1,model:new Date()},
          {name:"Versa",brandId:1,model:new Date()},
          {name:"Ranger",brandId:2,model:new Date()},
          {name:"Mondeo",brandId:2,model:new Date()},
          {name:"Cronos",brandId:4,model:new Date()},
          {name:"Uno",brandId:4,model:new Date()}
      ]
    });
    await prisma.Version.createMany({
      data:[
        {name:"Caja manual 5 velocidades",carId:1},
        {name:"Caja automática 6 velocidades",carId:1},
        {name:"Caja manual 5 velocidades",carId:2},
        {name:"Caja automática 6 velocidades",carId:2},
        {name:"Caja manual 5 velocidades",carId:3},
        {name:"Caja automática 6 velocidades",carId:3},
        {name:"Caja manual 5 velocidades",carId:4},
        {name:"Caja automática 6 velocidades",carId:4},
        
      ]
    })

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}


userSeed();