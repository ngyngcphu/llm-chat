import type { RouteHandlerMethod } from 'fastify';
import { SampleConversationDto } from '@api/dtos/out';
import { sampleConversationHandler } from '@api/handlers';
import { createRoutes } from '@api/utils';

export const sampleConversationPlugin = createRoutes('Sample Conversation', [
    {
        method: 'GET',
        url: '/questions',
        schema: {
            summary: 'Get four sample questions',
            description: 'Get four sample questions',
            response: {
                200: SampleConversationDto
            }
        },
        handler: sampleConversationHandler.getFourQuestions as RouteHandlerMethod
    }
]);
