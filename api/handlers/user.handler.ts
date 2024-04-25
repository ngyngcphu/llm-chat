import { USER_NOT_FOUND } from '@api/constants';
import { prisma } from '@api/repositories';
import { UserDto } from '@api/dtos/out';
import { Handler } from '@api/interfaces';

const getUserById: Handler<UserDto> = async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true
        },
        where: { id: userId }
    });
    if (user === null) return res.badRequest(USER_NOT_FOUND);
    return user;
};

export const usersHandler = {
    getUserById
};
