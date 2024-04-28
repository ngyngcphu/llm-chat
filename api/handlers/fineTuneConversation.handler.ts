import OpenAI from 'openai';
import moment from 'moment';
import { envs } from '@api/configs';
import { SYSTEM_PROMPT } from '@api/constants';
import { FineTuneQuestionRequestBodyDto } from '@api/dtos/in';
import { AnswerResultDto } from '@api/dtos/out';
import { Handler } from '@api/interfaces';
import { prisma } from '@api/repositories';

const openai = new OpenAI({
    apiKey: envs.OPENAI_API_KEY
});

const getAnswer: Handler<AnswerResultDto, { Body: FineTuneQuestionRequestBodyDto }> = async (req, res) => {
    const question = await prisma.fineTuneQuestion.create({
        data: { content: req.body.questionContent },
        select: { id: true }
    });

    const answerGenerator = await openai.chat.completions.create({
        model: req.body.fineTuneModelId,
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: req.body.questionContent }
        ],
        stop: '  **STOP**',
        max_tokens: 300
    });

    const answer = await prisma.fineTuneAnswer.create({
        data: {
            content: answerGenerator.choices[0].message.content?.trim() ?? '',
            fineTuneQuestionId: question.id
        },
        select: { id: true, content: true, role: true }
    });

    let sectionId = req.body.sectionId ?? '';
    if (!req.body.sectionId) {
        const titleGenerator = await openai.chat.completions.create({
            model: req.body.fineTuneModelId,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                {
                    role: 'user',
                    content: `Write title for the context below (only content)\nContext: ${req.body.questionContent.trim()}`
                }
            ],
            stop: '  **STOP**',
            max_tokens: 50
        });

        const title = titleGenerator.choices[0].message.content ?? '';

        const createdSection = await prisma.section.create({
            data: {
                title,
                userId: req.userId,
                fineTuneChats: {
                    create: {
                        questionId: question.id,
                        answerId: answer.id,
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
                fineTuneChats: {
                    create: {
                        questionId: question.id,
                        answerId: answer.id,
                        date: moment().unix()
                    }
                }
            }
        });
    }
    return res.send({ content: answer.content, role: answer.role, sectionId: sectionId });
};

export const fineTuneConversationHandler = {
    getAnswer
};
