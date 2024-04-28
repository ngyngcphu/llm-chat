import { Static, Type } from '@sinclair/typebox';

export const ChatSectionIdDto = Type.Object({
    sectionId: Type.String()
});

export type ChatSectionIdDto = Static<typeof ChatSectionIdDto>;
