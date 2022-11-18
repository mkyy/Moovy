import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'audio' })
class AudioEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column({
    type: 'bytea'
  })
  data: Uint8Array;
}

export default AudioEntity;
