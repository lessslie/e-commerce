import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';

interface ICredentials{
  email:string;
  password:string
  }

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  // @Get()
  // getAuth(){
  //   return this.authService.getAuthService()
  // }

  @Post('signin')
  signIn(@Body()credentials:ICredentials) {
    return this.authService.getAuthLogin(credentials)
  }
}
