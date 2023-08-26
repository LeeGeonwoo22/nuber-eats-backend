import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { OrderItem } from './entities/orders-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish])],
})
export class OrdersModule {}
