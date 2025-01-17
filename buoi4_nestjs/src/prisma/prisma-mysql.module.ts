import { Global, Module } from '@nestjs/common';
import { PrismaMysqlService } from './prisma-mysql.service';

@Global()
@Module({
    providers: [PrismaMysqlService],
    exports: [PrismaMysqlService]
})
export class PrismaMysqlModule { }