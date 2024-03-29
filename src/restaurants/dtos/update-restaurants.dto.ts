import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantInput } from "./create-restaurants.dto";

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantInput) {}


@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  
  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}