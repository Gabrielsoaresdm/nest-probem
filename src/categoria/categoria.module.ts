import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./controller/categoria.controller";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./service/categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [TypeOrmModule],
})

export class CategoriaModule{}