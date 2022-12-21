import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../service/produto.service";

@ApiTags('produto')
@UseGuards(JwtAuthGuard)
@Controller('/produto')
@ApiBearerAuth()
export class ProdutoController{

    constructor(private readonly ProdutoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.ProdutoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.ProdutoService.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.ProdutoService.findByNome(nome)
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Produto: Produto): Promise<Produto>{
        return this.ProdutoService.create(Produto)
    }


    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Produto: Produto): Promise<Produto>{
        return this.ProdutoService.update(Produto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ProdutoService.delete(id)
    }

}