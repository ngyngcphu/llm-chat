import { ObjectId } from '@api/dtos/common';
import { Static, Type } from '@sinclair/typebox';

export const UserDto = Type.Object({
    id: ObjectId,
    email: Type.String({ format: 'email' }),
    sections: Type.Object({
        total: Type.Number(),
        data: Type.Array(
            Type.Object({
                id: Type.String(),
                title: Type.String()
            })
        )
    })
});

export type UserDto = Static<typeof UserDto>;
