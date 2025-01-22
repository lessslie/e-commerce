import { Module} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrm from 'src/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[typeOrm],
    }),
  TypeOrmModule.forRootAsync({
  inject:[ConfigService],
  useFactory:(config:ConfigService)=>{
    return config.get('typeorm');
  },
}),
    UsersModule,AuthModule,ProductsModule],
})



export class AppModule {};
