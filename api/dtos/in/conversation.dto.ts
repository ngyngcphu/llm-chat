import { Static, Type } from '@sinclair/typebox';

export const SampleQuestionRequestBodyDto = Type.Object({
    sectionId: Type.Optional(Type.String()),
    fineTuneModelId: Type.String(),
    questionId: Type.String()
});

export const FineTuneQuestionRequestBodyDto = Type.Object({
    sectionId: Type.Optional(Type.String()),
    fineTuneModelId: Type.String(),
    questionContent: Type.String()
});

export type SampleQuestionRequestBodyDto = Static<typeof SampleQuestionRequestBodyDto>;
export type FineTuneQuestionRequestBodyDto = Static<typeof FineTuneQuestionRequestBodyDto>;
