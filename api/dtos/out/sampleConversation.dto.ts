import { Static, Type } from '@sinclair/typebox';

export const SampleConversationDto = Type.Object({
    data: Type.Array(Type.String())
});

export type SampleConversationDto = Static<typeof SampleConversationDto>;
