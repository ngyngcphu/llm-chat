import { Role } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const SampleQuestionResultDto = Type.Object({
    data: Type.Array(
        Type.Object({
            id: Type.String(),
            content: Type.String(),
            role: Type.Enum(Role)
        })
    )
});

export const AnswerResultDto = Type.Object({
    sectionId: Type.String(),
    content: Type.String(),
    role: Type.Enum(Role)
});

export type SampleQuestionResultDto = Static<typeof SampleQuestionResultDto>;
export type AnswerResultDto = Static<typeof AnswerResultDto>;
