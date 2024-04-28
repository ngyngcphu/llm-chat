import type { RouteHandlerMethod } from 'fastify';
import { SampleQuestionRequestBodyDto } from '@api/dtos/in';
import { AnswerResultDto, SampleQuestionResultDto } from '@api/dtos/out';
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
                200: SampleQuestionResultDto
            }
        },
        handler: sampleConversationHandler.getFourQuestions as RouteHandlerMethod
    },
    {
        method: 'POST',
        url: '/answer',
        schema: {
            summary: 'Get the answer of a sample question',
            description: 'Get the answer of a sample question',
            body: SampleQuestionRequestBodyDto,
            response: {
                200: AnswerResultDto
            }
        },
        handler: sampleConversationHandler.getAnswer as RouteHandlerMethod
    }
]);
