import { PrismaClient } from '@prisma/client';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function importCarsFromCSV(csvFilePath: string) {
  const cars: { name: string; brandId: number; model: Date }[] = [];
  let skippedRows = 0;

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv({ 
        separator: ';',
        headers: ['brandId', 'name']
      }))
      .on('data', (row) => {
        if (row.name && row.brandId) {
          const brandId = parseInt(row.brandId, 10);
          if (!isNaN(brandId) && brandId > 0) {
            cars.push({
              name: row.name,
              brandId: brandId,
              model: new Date(),
            });
          } else {
            skippedRows++;
            console.log(`⚠️ Saltando fila con brandId inválido: ${row.brandId}`);
          }
        }
      })
      .on('end', async () => {
        try {
          // Primero borramos los autos existentes
          await prisma.car.deleteMany({});
          
          // Luego insertamos los nuevos
          await prisma.car.createMany({ 
            data: cars,
            skipDuplicates: true 
          });
          
          console.log(`✅ ${cars.length} autos importados correctamente`);
          if (skippedRows > 0) {
            console.log(`⚠️ ${skippedRows} filas fueron saltadas por tener brandId inválido`);
          }
          resolve();
        } catch (error) {
          console.error('❌ Error al importar autos:', error);
          reject(error);
        } finally {
          await prisma.$disconnect();
        }
      })
      .on('error', (error) => {
        console.error('❌ Error leyendo el CSV:', error);
        reject(error);
      });
  });
}

// Ejecutar el import
const csvPath = path.join(__dirname, 'modelos.csv');

async function main() {
  try {
    await importCarsFromCSV(csvPath);
  } catch (error) {
    console.error('Error en el proceso de importación:', error);
    process.exit(1);
  }
}

main(); 