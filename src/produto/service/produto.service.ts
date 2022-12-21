import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";


@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(Produto)
            private ProdutoRepository: Repository<Produto> 
    ) {}

    async findAll(): Promise<Produto[]> { 
        return await this.ProdutoRepository.find({
            relations: {
                categoria: true,
                usuario: true
            }
        })
    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.ProdutoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true,
                usuario: true
            }
        })
        
        if (!produto)
        throw new HttpException('produto não existe', HttpStatus.NOT_FOUND)

        return produto
        }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true,
                usuario: true
            }
        })
}

    async create(produto: Produto): Promise<Produto>{
        return await this.ProdutoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto>{
        let buscarproduto = await this.findById(produto.id)
        
        if(!produto || !produto.id)
            throw new HttpException('produto não existe', HttpStatus.NOT_FOUND)

            return await this.ProdutoRepository.save(produto)
}

    async delete(id: number): Promise<DeleteResult> {
        let buscarproduto = await this.findById(id)

        if(!buscarproduto)
            throw new HttpException('produto não encontrado!', HttpStatus.NOT_FOUND)

        return await this.ProdutoRepository.delete(id)
}
   






}