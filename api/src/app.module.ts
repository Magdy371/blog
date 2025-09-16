import { Module } from '@nestjs/common';
import { UserModule} from "./user/user.module";
import { roleModule } from './role/role.module';
import { UserRoleModule } from './userrole/userrole.module';

@Module({
  imports: [UserModule, roleModule, UserRoleModule],
})
export class AppModule {}
