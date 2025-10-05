// import * as fs from 'fs';
// import * as path from 'path';
// import * as xlsx from 'xlsx';
// import { createObjectCsvWriter } from 'csv-writer';

// interface CarVersion {
//   brandId: number;
//   name: string;
//   version: string;
// }

// async function extractFromExcel(excelPath: string): Promise<CarVersion[]> {
//   try {
//     const workbook = xlsx.readFile(excelPath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);
    
//     const carVersions: CarVersion[] = [];

//     for (const row of jsonData) {
//       if (row.brandId && row.name && row.version) {
//         const brandId = parseInt(row.brandId, 10);
//         if (!isNaN(brandId) && brandId > 0) {
//            carVersions.push({
//              brandId: brandId,
//              name: String(row.name).trim(),
//              version: String(row.version).trim()
//            });
//         } else {
//           console.log(`⚠️ Saltando fila con brandId inválido: ${row.brandId}`);
//         }
//       } else {
//          console.log(`⚠️ Saltando fila incompleta:`, row);
//       }
//     }

//     return carVersions;
//   } catch (error) {
//     console.error('Error procesando el archivo Excel:', error);
//     return [];
//   }
// }

// async function saveToCSV(data: CarVersion[], outputPath: string) {
//   const csvWriter = createObjectCsvWriter({
//     path: outputPath,
//     header: [
//       { id: 'brandId', title: 'brandId' },
//       { id: 'name', title: 'name' },
//       { id: 'version', title: 'version' }
//     ]
//   });

//   await csvWriter.writeRecords(data);
//   console.log(`✅ CSV guardado en ${outputPath}`);
// }

// async function main() {
//   const excelPath = path.join(__dirname, 'autosModi.xlsx');
//   const outputPath = path.join(__dirname, 'autos-versiones.csv');

//   try {
//     console.log('📊 Extrayendo información del archivo Excel...');
//     const carVersions = await extractFromExcel(excelPath);
    
//     console.log(`📊 Se encontraron ${carVersions.length} versiones de autos`);
    
//     console.log('💾 Guardando en CSV...');
//     await saveToCSV(carVersions, outputPath);
    
//     console.log('✅ Proceso completado');
//   } catch (error) {
//     console.error('❌ Error en el proceso:', error);
//   }
// }

// main(); 