import {Global, Module} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger, LoggerEntity } from './entities/logger.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logger.name, schema: LoggerEntity }]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
