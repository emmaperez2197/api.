import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import * as bcrypt from 'bcrypt'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true})
  email: string;

  @Prop({
    set: (password: string) => bcrypt.hashSync(password, 10)
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);