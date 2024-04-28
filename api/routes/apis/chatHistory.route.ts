import type { RouteHandlerMethod } from 'fastify';
import { ChatSectionIdDto } from '@api/dtos/in';
import { ChatMessageDto } from '@api/dtos/out';
import { chatHistoryHandler } from '@api/handlers';
import { createRoutes } from '@api/utils';

export const chatHistoryPlugin = createRoutes('Chat History', [
    {
        method: 'GET',
        url: '/:sectionId',
        schema: {
            summary: 'Get chat history of a section',
            description: 'Get chat history of a section',
            params: ChatSectionIdDto,
            response: {
                200: ChatMessageDto
            }
        },
        handler: chatHistoryHandler.getHistory as RouteHandlerMethod
    }
]);
