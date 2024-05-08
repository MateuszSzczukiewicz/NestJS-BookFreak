import { OmitType } from '@nestjs/mapped-types';
import { UpdateBookDto } from './update-book.dto';

export class CreateBookDto extends OmitType(UpdateBookDto, ['id'] as const) {}
