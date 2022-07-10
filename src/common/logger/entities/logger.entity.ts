import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoggerDocument = Logger & Document;

@Schema()
export class Logger extends Document {
  @Prop()
  ip: string;

  @Prop()
  method: string;

  @Prop()
  url: string;

  @Prop({type:String})
  body: object;

  @Prop({type:String})
  params: object;

  @Prop({type:String})
  query: object ;

  @Prop({type:String})
  response: object ;

  @Prop()
  elapsedTime: number;
}

export const LoggerEntity = SchemaFactory.createForClass(Logger);
