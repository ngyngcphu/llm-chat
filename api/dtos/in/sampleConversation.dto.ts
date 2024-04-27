import { Static, Type } from '@sinclair/typebox';

export const SampleQuestionIdDto = Type.Object({
    fineTuneModelId: Type.String(),
    questionId: Type.String()
});

export type SampleQuestionIdDto = Static<typeof SampleQuestionIdDto>;
