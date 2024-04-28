import OpenAI from 'openai';
import moment from 'moment';
import { Role } from '@prisma/client';
import { envs } from '@api/configs';
import { SYSTEM_PROMPT } from '@api/constants';
import { SampleQuestionRequestBodyDto } from '@api/dtos/in';
import { AnswerResultDto, SampleQuestionResultDto } from '@api/dtos/out';
import { Handler } from '@api/interfaces';
import { prisma } from '@api/repositories';

const openai = new OpenAI({
    apiKey: envs.OPENAI_API_KEY
});

const getFourQuestions: Handler<SampleQuestionResultDto> = async (_, res) => {
    const results: { id: string; content: string; role: Role }[] =
        await prisma.$queryRaw`SELECT "id", "content", "role" FROM "SampleQuestion" ORDER BY RANDOM() LIMIT 4`;
    const removeBulletInResults = results.map((result) => ({ id: result.id, content: result.content.slice(2).trim(), role: result.role }));
    return res.send({ data: removeBulletInResults });
};

const getAnswer: Handler<AnswerResultDto, { Body: SampleQuestionRequestBodyDto }> = async (req, res) => {
    const contextTitle = await prisma.sampleQuestion.findUnique({
        where: { id: req.body.questionId },
        select: { context: { select: { title: true } }, content: true, role: true }
    });
    if (!contextTitle) return res.badRequest('Question not found');

    let title = contextTitle?.context.title ?? '';

    const answer = await prisma.sampleAnswer.findUnique({
        select: {
            id: true,
            content: true,
            role: true
        },
        where: { sampleQuestionId: req.body.questionId }
    });
    if (!answer) return res.notFound('Answer not found');

    let sectionId = req.body.sectionId ?? '';
    if (!req.body.sectionId) {
        if (title.length === 0) {
            const titleGenerator = await openai.chat.completions.create({
                model: req.body.fineTuneModelId,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    {
                        role: 'user',
                        content: `Write title for the context below (only content)\nContext: ${contextTitle?.content.slice(2).trim()}`
                    }
                ],
                stop: '  **STOP**',
                max_tokens: 50
            });

            title = titleGenerator.choices[0].message.content ?? '';
        }

        const createdSection = await prisma.section.create({
            data: {
                title,
                userId: req.userId,
                sampleChats: {
                    create: {
                        questionId: req.body.questionId,
                        answerId: answer?.id ?? '',
                        date: moment().unix()
                    }
                }
            },
            select: { id: true }
        });
        sectionId = createdSection.id;
    } else {
        await prisma.section.update({
            where: { id: req.body.sectionId },
            data: {
                sampleChats: {
                    create: {
                        questionId: req.body.questionId,
                        answerId: answer?.id ?? '',
                        date: moment().unix()
                    }
                }
            }
        });
    }
    return res.send({ content: answer?.content.slice(2).trim() ?? '', role: answer?.role, sectionId: sectionId });
};

export const sampleConversationHandler = {
    getFourQuestions,
    getAnswer
};
