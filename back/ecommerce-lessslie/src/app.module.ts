import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const typeOrmConfig = config.get('typeorm');
        if (!typeOrmConfig) {
          throw new Error('TypeORM configuration not found');
        }
        return typeOrmConfig;
      },
    }),
    FileUploadModule,
    OrdersModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}

  //     useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
  //       const typeOrmOptions = config.get<TypeOrmModuleOptions>('typeorm');

  //       // Asegúrate de que typeOrmOptions no sea undefined
  //       if (!typeOrmOptions) {
  //         throw new Error('TypeORM configuration is not defined');
  //       }

  //       return typeOrmOptions;
  //     }
  //   })
  //   ,AuthModule,ProductsModule,UsersModule,CategoriesModule,OrdersModule,FileUploadModule],
  // })
  // export class AppModule {}

