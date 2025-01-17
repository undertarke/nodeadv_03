import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'node_modules/.zprisma/client-mysql';

@Injectable()
export class PrismaMysqlService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}