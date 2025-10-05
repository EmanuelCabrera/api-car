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
        {name:"Abarth"},
        {name:"Alfa Romeo"},
        {name:"Aro"},
        {name:"Asia"},
        {name:"Asia Motors"},
        {name:"Aston Martin"},
        {name:"Audi"},
        {name:"Austin"},
        {name:"Auverland"},
        {name:"Bentley"},
        {name:"Bertone"},
        {name:"Bmw"},
        {name:"Cadillac"},
        {name:"Chevrolet"},
        {name:"Chrysler"},
        {name:"Citroen"},
        {name:"Corvette"},
        {name:"Dacia"},
        {name:"Daewoo"},
        {name:"Daf"},
        {name:"Daihatsu"},
        {name:"Daimler"},
        {name:"Dodge"},
        {name:"Ferrari"},
        {name:"Fiat"},
        {name:"Ford"},
        {name:"Galloper"},
        {name:"Gmc"},
        {name:"Honda"},
        {name:"Hummer"},
        {name:"Hyundai"},
        {name:"Infiniti"},
        {name:"Innocenti"},
        {name:"Isuzu"},
        {name:"Iveco"},
        {name:"Iveco-pegaso"},
        {name:"Jaguar"},
        {name:"Jeep"},
        {name:"Kia"},
        {name:"Lada"},
        {name:"Lamborghini"},
        {name:"Lancia"},
        {name:"Land-rover"},
        {name:"Ldv"},
        {name:"Lexus"},
        {name:"Lotus"},
        {name:"Mahindra"},
        {name:"Maserati"},
        {name:"Maybach"},
        {name:"Mazda"},
        {name:"Mercedes-benz"},
        {name:"Mg"},
        {name:"Mini"},
        {name:"Mitsubishi"},
        {name:"Morgan"},
        {name:"Nissan"},
        {name:"Opel"},
        {name:"Peugeot"},
        {name:"Pontiac"},
        {name:"Porsche"},
        {name:"Renault"},
        {name:"Rolls-royce"},
        {name:"Rover"},
        {name:"Saab"},
        {name:"Santana"},
        {name:"Seat"},
        {name:"Skoda"},
        {name:"Smart"},
        {name:"Ssangyong"},
        {name:"Subaru"},
        {name:"Suzuki"},
        {name:"Talbot"},
        {name:"Tata"},
        {name:"Toyota"},
        {name:"Umm"},
        {name:"Vaz"},
        {name:"Volkswagen"},
        {name:"Volvo"},
        {name:"Wartburg"}
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
    // await prisma.Version.createMany({
    //   data:[
    //     {name:"Caja manual 5 velocidades",carId:1},
    //     {name:"Caja automática 6 velocidades",carId:1},
    //     {name:"Caja manual 5 velocidades",carId:2},
    //     {name:"Caja automática 6 velocidades",carId:2},
    //     {name:"Caja manual 5 velocidades",carId:3},
    //     {name:"Caja automática 6 velocidades",carId:3},
    //     {name:"Caja manual 5 velocidades",carId:4},
    //     {name:"Caja automática 6 velocidades",carId:4},
        
    //   ]
    // })

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