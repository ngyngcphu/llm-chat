import { compare, hash } from 'bcrypt';
import { prisma } from '@api/repositories';
import { cookieOptions, LOGIN_FAIL, SALT_ROUNDS, USER_NOT_FOUND } from '@api/constants';
import jwt from 'jsonwebtoken';
import { envs } from '@api/configs';
import { SignInInputDto, SignUpInputDto } from '@api/dtos/in';
import { AuthResultDto } from '@api/dtos/out';
import { Handler } from '@api/interfaces';

const login: Handler<AuthResultDto, { Body: SignInInputDto }> = async (req, res) => {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            password: true
        },
        where: { email: req.body.email }
    });
    if (!user) return res.badRequest(USER_NOT_FOUND);

    const correctPassword = await compare(req.body.password, user.password);
    if (!correctPassword) return res.badRequest(LOGIN_FAIL);

    const userToken = jwt.sign({ userId: user.id }, envs.JWT_SECRET);
    res.setCookie('token', userToken, cookieOptions);

    return {
        id: user.id,
        email: user.email
    };
};

const signup: Handler<AuthResultDto, { Body: SignUpInputDto }> = async (req, res) => {
    const hashPassword = await hash(req.body.password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: hashPassword,
            name: req.body.name
        }
    });

    const userToken = jwt.sign({ userId: user.id }, envs.JWT_SECRET);
    res.setCookie('token', userToken, cookieOptions);

    return {
        id: user.id,
        email: user.email
    };
};

const logout: Handler = async (_req, res) => {
    res.clearCookie('token');
    return null;
};

export const authHandler = {
    login,
    signup,
    logout
};
