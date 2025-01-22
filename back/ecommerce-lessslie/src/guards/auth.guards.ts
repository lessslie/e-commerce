import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// function validateRequest(request: Request) {
//   const token = request.headers['token'];
//   return token === '1234';
// }

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;

    const auth = authHeader.split(' ')[1];
    ///Basic: <email>:<password>
    ///Basic:
    ///<email>:<password>
    const [email, password]= auth.split(':');
    ///<email>:<password>
    ///email= alguien@mail.com
    // password= admin123
    ///
    if(!email || !password) return false;

return true
}


}

