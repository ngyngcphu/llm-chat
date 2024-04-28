import { verifyToken } from '@api/hooks';
import { FastifyInstance } from 'fastify';
import { userPlugin } from './user.route';
import { fineTuneModelPlugin } from './fineTuneModel.route';
import { sampleConversationPlugin } from './sampleConversation.route';
import { fineTuneConversationPlugin } from './fineTuneConversation.route';
import { chatHistoryPlugin } from './chatHistory.route';

export async function apiPlugin(app: FastifyInstance) {
    // Why use decorator: https://fastify.dev/docs/latest/Reference/Decorators/#decorators
    app.decorateRequest('userId', null);
    app.addHook('preHandler', verifyToken);

    app.register(userPlugin, { prefix: '/user' });
    app.register(fineTuneModelPlugin, { prefix: '/models' });
    app.register(sampleConversationPlugin, { prefix: '/sample' });
    app.register(fineTuneConversationPlugin, { prefix: '/fine-tune' });
    app.register(chatHistoryPlugin, { prefix: '/history' });
}
