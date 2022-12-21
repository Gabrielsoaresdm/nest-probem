import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist";
import { UsuarioLogin } from "../entities/usuariologin";


import { LocalAuthGuard } from "../guard/local-auth.guarda";
import { AuthService } from "../service/auth.service";

@ApiTags('Usuario')
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UsuarioLogin){
        return this.authService.login(user)
    }





}