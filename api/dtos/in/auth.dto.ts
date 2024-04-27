import { MIN_EMAIL_LENGTH, MIN_PASSWORD_LENGTH } from '@api/constants';
import { Static, Type } from '@sinclair/typebox';

export const SignInInputDto = Type.Object(
    {
        email: Type.String({ minLength: MIN_EMAIL_LENGTH }),
        password: Type.String({ minLength: MIN_PASSWORD_LENGTH })
    },
    {
        examples: [
            {
                email: 'phu.nguyen2310@hcmut.edu.vn',
                password: '123456789'
            }
        ]
    }
);

export const SignUpInputDto = Type.Object(
    {
        email: Type.String({ minLength: MIN_EMAIL_LENGTH }),
        password: Type.String({ minLength: MIN_PASSWORD_LENGTH }),
        name: Type.String()
    },
    {
        examples: [
            {
                email: 'phu.nguyen2310@hcmut.edu.vn',
                password: '123456789',
                name: 'Nguyen Ngoc Phu'
            }
        ]
    }
);

export type SignUpInputDto = Static<typeof SignUpInputDto>;
export type SignInInputDto = Static<typeof SignInInputDto>;
