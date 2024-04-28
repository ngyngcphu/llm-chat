import { Role } from '@prisma/client';
import { ChatSectionIdDto } from '@api/dtos/in';
import { ChatMessageDto } from '@api/dtos/out';
import { Handler } from '@api/interfaces';
import { prisma } from '@api/repositories';

const getHistory: Handler<ChatMessageDto, { Params: ChatSectionIdDto }> = async (req, res) => {
    const section = await prisma.section.findUnique({
        where: { id: req.params.sectionId },
        include: {
            sampleChats: {
                include: {
                    question: true,
                    answer: true
                }
            },
            fineTuneChats: {
                include: {
                    question: true,
                    answer: true
                }
            }
        }
    });

    if (!section) return res.badRequest('Section not found');
    const removeBulletInSampleChat = section.sampleChats.map((result) => ({
        ...result,
        question: { ...result.question, content: result.question.content.slice(2).trim() },
        answer: { ...result.answer, content: result.answer.content.slice(2).trim() }
    }));

    const combinedChat = [...removeBulletInSampleChat, ...section.fineTuneChats].sort((a, b) => a.date - b.date);
    const flattenedChat = combinedChat.flatMap((c) => [
        { role: Role.USER, content: c.question.content, date: c.date },
        { role: Role.ASSISTANT, content: c.answer.content, date: c.date }
    ]);
    return res.send({ data: flattenedChat });
};

export const chatHistoryHandler = {
    getHistory
};
