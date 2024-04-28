import { Role } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const ChatMessageDto = Type.Object({
    data: Type.Array(
        Type.Object({
            role: Type.Enum(Role),
            content: Type.String(),
            date: Type.Number()
        })
    )
});

export type ChatMessageDto = Static<typeof ChatMessageDto>;
