import { UserEntity } from '../users/users.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar', nullable: false })
  slug: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ nullable: false })
  title: string;

  @IsOptional({ always: true })
  @Column({ default: '', nullable: true })
  description: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ nullable: false })
  body: string;

  // TODO create a function to set default timestamp
  @Column({ type: 'timestamp', default: () => `now() at time zone 'utc'` })
  created: Date;

  @Column({ type: 'timestamp', default: () => `now() at time zone 'utc'` })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @Column({ type: 'simple-array' })
  tagList: string[];

  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @Column({ default: 0 })
  favoriteCount: number;
}
