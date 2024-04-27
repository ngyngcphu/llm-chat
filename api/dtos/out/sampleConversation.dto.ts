import { Static, Type } from '@sinclair/typebox';

export const SampleQuestionDto = Type.Object({
    data: Type.Array(
        Type.Object({
            id: Type.String(),
            content: Type.String()
        })
    )
});

export type SampleQuestionDto = Static<typeof SampleQuestionDto>;
