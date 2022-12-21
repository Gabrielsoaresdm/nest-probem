import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: {
                produto: true
            }
        })
    }


    async findById(id: number): Promise<Categoria> {
        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
    })

    if (!categoria)
            throw new HttpException('Categoria não existe', HttpStatus.NOT_FOUND)

            return categoria
            
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                produto: true
            }
        })
}

    async create(Categoria: Categoria): Promise<Categoria>{
    return await this.categoriaRepository.save(Categoria)
}

    async update(Categoria: Categoria): Promise<Categoria>{
    let buscarCategoria = await this.findById(Categoria.id)
    
    if(!Categoria || !Categoria.id)
        throw new HttpException('Categoria não existe', HttpStatus.NOT_FOUND)

        return await this.categoriaRepository.save(Categoria)
}

    async delete(id: number): Promise<DeleteResult> {
    let buscarCategoria = await this.findById(id)

    if(!buscarCategoria)
        throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND)

    return await this.categoriaRepository.delete(id)
}








}