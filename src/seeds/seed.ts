import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

async function bootstrap() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminDni = process.env.SEED_ADMIN_DNI;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminDni || !adminPassword) {
    throw new Error(
      'SEED_ADMIN_EMAIL, SEED_ADMIN_DNI and SEED_ADMIN_PASSWORD are required to create the initial operator.',
    );
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const existing = await usersService.findByEmail(adminEmail);
  if (!existing) {
    await usersService.create({
      nombres: 'Admin',
      apellidos: 'Principal',
      dni: adminDni,
      email: adminEmail,
      password: adminPassword,
      role: UserRole.OPERADOR,
    });
    console.log('Operador inicial creado');
  }
  await app.close();
}
bootstrap();
