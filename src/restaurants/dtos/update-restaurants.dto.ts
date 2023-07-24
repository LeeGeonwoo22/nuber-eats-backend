import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurants.dto";

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}


@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  
  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}