import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface CarQueryResponse {
  Models: Array<{
    model_name: string;
    model_trim: string;
    model_year: string;
    model_body: string;
    model_engine_position: string;
    model_engine_cc: string;
    model_engine_cyl: string;
    model_engine_type: string;
    model_engine_valves_per_cyl: string;
    model_engine_power_ps: string;
    model_engine_power_rpm: string;
    model_engine_torque_nm: string;
    model_engine_torque_rpm: string;
    model_engine_bore_mm: string;
    model_engine_stroke_mm: string;
    model_engine_compression: string;
    model_engine_fuel: string;
    model_top_speed_kph: string;
    model_0_to_100_kph: string;
    model_drive: string;
    model_transmission_type: string;
    model_seats: string;
    model_doors: string;
    model_weight_kg: string;
    model_length_mm: string;
    model_width_mm: string;
    model_height_mm: string;
    model_wheelbase_mm: string;
    model_lkm_highway: string;
    model_lkm_mixed: string;
    model_lkm_city: string;
    model_fuel_cap_l: string;
    model_sold_in_us: string;
    model_co2: string;
    model_make_display: string;
  }>;
}

async function getCarVersions(brandName: string, modelName: string): Promise<string[]> {
  try {
    const response = await axios.get<CarQueryResponse>(
      `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${encodeURIComponent(brandName)}&model=${encodeURIComponent(modelName)}&year=all`
    );

    // Extraer las versiones únicas
    const versions = new Set<string>();
    response.data.Models.forEach(model => {
      if (model.model_trim) {
        versions.add(model.model_trim);
      }
    });

    return Array.from(versions);
  } catch (error) {
    console.error(`Error obteniendo versiones para ${brandName} ${modelName}:`, error);
    return [];
  }
}

async function importVersions() {
  try {
    // Obtener todos los autos de la base de datos
    const cars = await prisma.car.findMany({
      include: {
        brand: true
      }
    });

    console.log(`Procesando ${cars.length} autos...`);

    for (const car of cars) {
      if (!car.brand) {
        console.log(`⚠️ Auto sin marca: ${car.name}`);
        continue;
      }

      console.log(`Obteniendo versiones para ${car.brand.name} ${car.name}...`);
      const versions = await getCarVersions(car.brand.name, car.name);

      if (versions.length > 0) {
        // Crear las versiones en la base de datos
        await prisma.version.createMany({
          data: versions.map(version => ({
            name: version,
            carId: car.id
          })),
          skipDuplicates: true
        });

        console.log(`✅ ${versions.length} versiones importadas para ${car.brand.name} ${car.name}`);
      } else {
        console.log(`⚠️ No se encontraron versiones para ${car.brand.name} ${car.name}`);
      }

      // Esperar 1 segundo entre cada petición para no sobrecargar la API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('✅ Proceso de importación completado');
  } catch (error) {
    console.error('❌ Error en el proceso de importación:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el import
importVersions(); 