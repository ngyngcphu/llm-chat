import type { RouteHandlerMethod } from 'fastify';
import { FineTuneQuestionRequestBodyDto } from '@api/dtos/in';
import { AnswerResultDto } from '@api/dtos/out';
import { fineTuneConversationHandler } from '@api/handlers';
import { createRoutes } from '@api/utils';

export const fineTuneConversationPlugin = createRoutes('Fine Tune Conversation', [
    {
        method: 'POST',
        url: '/answer',
        schema: {
            summary: 'Get the answer of a fine-tune question',
            description: 'Get the answer of a fine-tune question',
            body: FineTuneQuestionRequestBodyDto,
            response: {
                200: AnswerResultDto
            }
        },
        handler: fineTuneConversationHandler.getAnswer as RouteHandlerMethod
    }
]);
