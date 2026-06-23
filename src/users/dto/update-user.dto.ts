import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// El rol es un atributo de autorización: nunca debe venir del perfil que un
// usuario actualiza por sí mismo. Los cambios de rol requieren una operación
// administrativa independiente protegida con RolesGuard.
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['role'] as const),
) {}
