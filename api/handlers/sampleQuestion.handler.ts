import { Handler } from '@api/interfaces';
import { SampleConversationDto } from '@api/dtos/out';
import { prisma } from '@api/repositories';

const getFourQuestions: Handler<SampleConversationDto> = async (_, res) => {
    const questions: { questions: string }[] = await prisma.$queryRaw`SELECT "questions" FROM "Conversation" ORDER BY RANDOM() LIMIT 1`;
    const results = questions[0].questions.split('\n').slice(0, 4);
    return res.send({ data: results });
};

export const sampleConversationHandler = {
    getFourQuestions
};
