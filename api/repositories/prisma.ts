import { PrismaClient } from '@prisma/client';
import { logger } from '@api/configs';

export const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        }
    ]
});

prisma.$on('query', (e) => logger.info(e));
