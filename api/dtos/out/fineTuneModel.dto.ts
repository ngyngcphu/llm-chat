import { Static, Type } from '@sinclair/typebox';

export const FineTuneModelDto = Type.Object({
    data: Type.Array(Type.String())
});

export type FineTuneModelDto = Static<typeof FineTuneModelDto>;
