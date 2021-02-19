import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ArticleEntity } from './articles.entity';

@Injectable()
export class ArticlesService extends TypeOrmCrudService<ArticleEntity> {
  constructor(@InjectRepository(ArticleEntity) repo) {
    super(repo);
  }
}
