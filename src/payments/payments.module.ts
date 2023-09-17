import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';
import { PaymentResolver } from './payments.resolver';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService, PaymentResolver, Restaurant],
})
export class PaymentsModule {}
