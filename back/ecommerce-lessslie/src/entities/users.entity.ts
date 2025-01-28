import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './orders.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password: string;

  @Column({ type: 'int'})
  phone: number;

  @Column({ type: 'varchar', length: 50, nullable:true })
  country: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable:true })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
