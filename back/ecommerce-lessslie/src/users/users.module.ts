import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { response } from 'express';

// const mockUserService ={
//     getUsers:()=> "Esto es un servicio de mock de usuarios"};


@Module({
    providers: [
        // {
        // provide: UsersService,
        // useValue: mockUserService,
        // },
        UsersService,
        UsersRepository,
    {
        provide: "API_USERS",
        useFactory: async () =>{
            const apiUsers = await fetch(
                "https://jsonplaceholder.typicode.com/users",
            ).then((response)=> response.json());
            return apiUsers.map((user)=>{
                return{
                    id:user.id,
                    name: user.name,
                    email: user.email,
                };
                
            })
        }
    }
    ],
    controllers : [UsersController]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
    //    consumer.apply(LoggerMiddleware).forRoutes("users");
    }
}