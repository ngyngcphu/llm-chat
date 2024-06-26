import fastify, { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import { envs, swaggerConfig, swaggerUIConfig, loggerConfig } from '@api/configs';
import { apiPlugin, authPlugin } from './routes';
import { customErrorHandler } from '@api/handlers';

export function createServer(config: ServerConfig): FastifyInstance {
    const app = fastify({ logger: loggerConfig[envs.NODE_ENV] });

    app.register(import('@fastify/sensible'));
    app.register(import('@fastify/helmet'));
    app.register(import('@fastify/cors'), {
        origin: envs.CORS_WHITE_LIST,
        credentials: true
    });

    app.register(import('@fastify/cookie'), {
        secret: envs.COOKIE_SECRET, // for cookies signature
        hook: 'onRequest'
    } as FastifyCookieOptions);

    app.register(import('@fastify/swagger'), swaggerConfig);
    app.register(import('@fastify/swagger-ui'), swaggerUIConfig);

    app.register(authPlugin, { prefix: '/auth' });
    app.register(apiPlugin, { prefix: '/api' });

    app.setErrorHandler(customErrorHandler);

    const shutdown = async () => {
        await app.close();
    };

    const start = async () => {
        await app.listen({
            host: config.host,
            port: config.port
        });
        await app.ready();
        if (!envs.isProd) {
            app.swagger({ yaml: true });
            const addr = app.server.address();
            if (!addr) return;
            const swaggerPath = typeof addr === 'string' ? addr : `http://${addr.address}:${addr.port}`;
            app.log.info(`Swagger documentation is on ${swaggerPath}/docs`);
        }
    };

    return {
        ...app,
        start,
        shutdown
    };
}
