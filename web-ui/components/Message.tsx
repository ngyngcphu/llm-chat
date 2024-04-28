import { UserMessage } from './UserMessage';
import { AssistantMessage } from './AssistantMessage';

export const Message: Component<{ message: { role: string; content: string } }> = ({ message }) => {
    switch (message.role) {
        case 'user':
            return <UserMessage>{message.content}</UserMessage>;
        case 'assistant':
            return <AssistantMessage>{message.content}</AssistantMessage>;
        default:
            throw new Error(`Unknown message role: ${message.role}`);
    }
};
