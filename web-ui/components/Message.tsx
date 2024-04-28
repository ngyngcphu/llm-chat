import { UserMessage } from './UserMessage';
import { AssistantMessage } from './AssistantMessage';

export const Message: Component<{ message: { role: RoleType; content: string } }> = ({ message }) => {
    switch (message.role) {
        case 'USER':
            return <UserMessage>{message.content}</UserMessage>;
        case 'ASSISTANT':
            return <AssistantMessage>{message.content}</AssistantMessage>;
        default:
            throw new Error(`Unknown message role: ${message.role}`);
    }
};
