import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
        const typeOrmOptions = config.get<TypeOrmModuleOptions>('typeorm');

        // Asegúrate de que typeOrmOptions no sea undefined
        if (!typeOrmOptions) {
          throw new Error('TypeORM configuration is not defined');
        }

        return typeOrmOptions;
      }
    })
    
    ,AuthModule,ProductsModule,UsersModule,CategoriesModule,OrdersModule],
    
  })
  export class AppModule {}
  
  
  // TypeOrmModule.forRootAsync({
    //   inject:[ConfigService],
    //   useFactory: (config : ConfigService)=>{
      //     return config.get('typeorm');
      //   },
