import { Role } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const SampleQuestionDto = Type.Object({
    data: Type.Array(
        Type.Object({
            id: Type.String(),
            question: Type.String(),
            role: Type.Enum(Role)
        })
    )
});

export const SampleAnswerDto = Type.Object({
    answer: Type.String(),
    role: Type.Enum(Role)
});

export type SampleQuestionDto = Static<typeof SampleQuestionDto>;
export type SampleAnswerDto = Static<typeof SampleAnswerDto>;
