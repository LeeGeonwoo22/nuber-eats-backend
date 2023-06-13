import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurants.entity";
import { CreateRestaurantDto } from "./dtos/restaurants.dto";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    @Query(returns=>[Restaurant])
    myRestaurant(@Args('veganOnly') veganOnly:boolean): Restaurant[]{
        console.log(veganOnly)
        return [];
    }
    @Mutation(of => Boolean)
    createRestaurant(@Args() CreateRestaurantDto : CreateRestaurantDto ) : true{
        console.log(CreateRestaurantDto);
        return true;
    }
}
