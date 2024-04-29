import type { RouteHandlerMethod } from 'fastify';
import { UserDto } from '@api/dtos/out';
import { usersHandler } from '@api/handlers';
import { createRoutes } from '@api/utils';

export const userPlugin = createRoutes('User', [
    {
        method: 'GET',
        url: '',
        schema: {
            summary: 'Get information and chat history of user by id',
            description: 'Get information and chat history of user by id',
            response: {
                200: UserDto
            }
        },
        handler: usersHandler.getUserById as RouteHandlerMethod
    }
]);
