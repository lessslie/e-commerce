import { Controller,Post,Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../dtos/auth.dto';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  // @Get()
  // getAuth(){
  //   return this.authService.getAuthService()
  // }

  // @Post('signin')
  // signIn(@Body()credentials:LoginUserDto) {
  //   return this.authService.getAuthLogin(credentials)
  // }

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.getAuthLogin(loginUserDto);
    } catch (error) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
  }

}
