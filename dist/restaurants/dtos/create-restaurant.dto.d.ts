import { Restaurant } from '../entities/restaurant.entity';
declare const CreateRestaurantDto_base: import("@nestjs/common").Type<Omit<Restaurant, "id">>;
export declare class CreateRestaurantDto extends CreateRestaurantDto_base {
}
export {};
