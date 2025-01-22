import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository{
    private auth = [
{
contraseña:" contraseña123"
}
    ];
async getAuth(){
    return this.auth
}
    
}