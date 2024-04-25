import type { RouteHandlerMethod } from 'fastify';
import { FineTuneModelDto } from '@api/dtos/out';
import { fineTuneModelHandler } from '@api/handlers';
import { createRoutes } from '@api/utils';

export const fineTuneModelPlugin = createRoutes('Model', [
    {
        method: 'GET',
        url: '',
        schema: {
            summary: 'Get all fine-tuned models',
            description: 'Get all fine-tuned models',
            response: {
                200: FineTuneModelDto
            }
        },
        handler: fineTuneModelHandler.getAll as RouteHandlerMethod
    }
]);
