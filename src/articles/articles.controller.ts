import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ArticleEntity } from './articles.entity';
import { ArticlesService } from './articles.service';

@Crud({
  model: {
    type: ArticleEntity,
  },
})
@Controller('articles')
export class ArticlesController implements CrudController<ArticleEntity> {
  constructor(public service: ArticlesService) {}
}
