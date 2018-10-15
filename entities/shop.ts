import {Entity, Index, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({name: 'shops'})
export class Shop {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({unique: true})
  name: string

  @Column()
  token: string
}
