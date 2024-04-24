import { envs } from 'api/configs';

export const cookieOptions = {
    signed: false,
    secure: envs.isProduction,
    path: '/',
    httpOnly: true
};
