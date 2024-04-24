import { FineTuneModelDto } from '@dtos/out';
import { fineTuneModelHandler } from '@handlers';
import { createRoutes } from '@utils';

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
        handler: fineTuneModelHandler.getAll
    }
]);
