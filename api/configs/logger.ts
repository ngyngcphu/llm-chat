import { FastifyError } from 'fastify';
import type { PinoLoggerOptions } from 'fastify/types/logger';
import pino from 'pino';

const errorSerialize = (err: FastifyError) => {
    const isInternalServerError = !err.statusCode || err.statusCode === 500;
    return {
        type: err.name,
        stack: isInternalServerError && err.stack ? err.stack : 'null',
        message: err.message,
        statusCode: err.statusCode
    };
};

const fileLogTargets = ['info', 'warn', 'error', 'fatal'].map((logLevel) => ({
    target: 'pino/file',
    level: logLevel,
    options: {
        destination: process.cwd() + `/logs/${logLevel}.log`,
        mkdir: true
    }
}));
const pinoLogTarget = {
    target: 'pino-pretty',
    level: 'info',
    options: {
        translateTime: 'dd/mm/yy HH:MM:ss',
        ignore: 'pid,hostname'
    }
};

type TransportTarget = pino.TransportTargetOptions<Record<string, unknown>>;

const devTransportTargets: TransportTarget[] = [pinoLogTarget];
const prodTransportTargets: TransportTarget[] = fileLogTargets;

export const loggerConfig: Record<NodeEnv, PinoLoggerOptions> = {
    development: {
        transport: { targets: devTransportTargets },
        serializers: { err: errorSerialize }
    },
    production: {
        transport: { targets: prodTransportTargets },
        serializers: { err: errorSerialize }
    },
    test: { serializers: { err: errorSerialize } }
};
