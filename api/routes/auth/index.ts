import type { RouteHandlerMethod } from 'fastify';
import { Type } from '@sinclair/typebox';
import { SignInInputDto, SignUpInputDto } from 'api/dtos/in';
import { AuthResultDto } from 'api/dtos/out';
import { authHandler } from 'api/handlers';
import { createRoutes } from 'api/utils';

export const authPlugin = createRoutes('Auth', [
    {
        method: 'POST',
        url: '/login',
        schema: {
            body: SignInInputDto,
            response: {
                200: AuthResultDto
            }
        },
        handler: authHandler.login as RouteHandlerMethod
    },
    {
        method: 'POST',
        url: '/signup',
        schema: {
            body: SignUpInputDto,
            response: {
                200: AuthResultDto
            }
        },
        handler: authHandler.signup as RouteHandlerMethod
    },
    {
        method: 'DELETE',
        url: '/logout',
        schema: {
            response: {
                200: Type.Null()
            }
        },
        handler: authHandler.logout as RouteHandlerMethod
    }
]);
