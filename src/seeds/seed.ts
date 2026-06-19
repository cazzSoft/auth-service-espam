import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const existing = await usersService.findByEmail('admin@example.com');
  if (!existing) {
    await usersService.create({
      nombres: 'Admin',
      apellidos: 'Principal',
      dni: '9999999999',
      email: 'admin@example.com',
      password: 'Admin12345',
      role: UserRole.OPERADOR,
    });
    console.log('Operador inicial creado');
  }
  await app.close();
}
bootstrap();