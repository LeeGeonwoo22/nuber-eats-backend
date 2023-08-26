import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver,
} from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';
import { CategoryRepository } from './repositrories/category.repository';
import { Dish } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository,Dish])],
  providers: [
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
    RestaurantService,
  ],
})
export class RestaurantsModule {}
