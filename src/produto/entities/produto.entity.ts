import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_produto"})
export class Produto{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length:100, nullable: false})
    @ApiProperty()
    nome: string

    @IsEmail()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    email: string //e-mail

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    contato: string

    @Column({length: 5000})
    @ApiProperty()
    foto: string

    @ApiProperty({type: () => Categoria})
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    
categoria: Categoria



@ApiProperty({type: () => Usuario})
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}