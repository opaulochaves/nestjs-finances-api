import * as argon2 from 'argon2';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArticleEntity } from '../articles/articles.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column()
  username: string;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsEmail()
  @Column()
  email: string;

  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @Column({ default: '' })
  bio: string;

  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @Column({ default: '' })
  image: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  @Type(() => ArticleEntity)
  favorites: ArticleEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.author)
  @Type(() => ArticleEntity)
  articles: ArticleEntity[];
}
