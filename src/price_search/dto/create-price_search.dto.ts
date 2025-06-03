import { IsString } from 'class-validator';

export class CreatePriceSearchDto {
  @IsString()
  text: string;
}
