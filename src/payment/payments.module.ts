import { Module } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payments.resolver';
import { PaymentService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), Restaurant],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
