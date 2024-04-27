import { Handler } from '@api/interfaces';
import { SampleQuestionDto } from '@api/dtos/out';
import { prisma } from '@api/repositories';

const getFourQuestions: Handler<SampleQuestionDto> = async (_, res) => {
    const results: { id: string; content: string }[] =
        await prisma.$queryRaw`SELECT "id", "content" FROM "SampleQuestion" ORDER BY RANDOM() LIMIT 4`;
    return res.send({ data: results });
};

export const sampleConversationHandler = {
    getFourQuestions
};
