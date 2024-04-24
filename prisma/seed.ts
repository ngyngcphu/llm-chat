import { PrismaClient } from '@prisma/client';
import { readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';
import { hashSync } from 'bcrypt';
import grayMatter from 'gray-matter';
import moment from 'moment';
import { removeMarkdown } from './utils/removeMarkdown';
import { limitTokens } from './utils/tokenize';
import { generateQuestions, generateAnswers } from './utils/generateQA';
import { MarkdownData } from './utils/configType';
import { fineTune } from './utils/fineTune';

const MD_DIRECTORY_PATH = './prisma/handbook';
const DEST_FILE_TRAIN = './prisma/qa_train.jsonl';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const user = {
    email: 'phu.nguyen2310@hcmut.edu.vn',
    password: '123456789'
};

async function generateSampleUser() {
    const hashPassword = hashSync(user.password, SALT_ROUNDS);
    try {
        await prisma.user.create({
            data: {
                email: user.email,
                password: hashPassword
            }
        });
        process.exit(0);
    } catch (err) {
        throw new Error('Error creating user:', err);
    }
}

async function parseHandbook() {
    try {
        const documents = await walkDirectory(MD_DIRECTORY_PATH);

        await Promise.all(
            documents.map(async (document) => {
                if (!document.content) {
                    document.questions = null;
                    return;
                }
                try {
                    const questions = await generateQuestions(document.content);
                    document.questions = questions;
                    return;
                } catch (error) {
                    document.questions = null;
                    throw new Error('Error generating questions:', error);
                }
            })
        );

        await Promise.all(
            documents.map(async (document) => {
                if (!document.questions || (document.questions && document.questions.length === 0)) {
                    document.answers = null;
                    return;
                }
                try {
                    const answers = await generateAnswers(document);
                    document.answers = answers;
                    return;
                } catch (error) {
                    document.answers = null;
                    throw new Error('Error generating answers:', error);
                }
            })
        );

        try {
            await prisma.conversation.deleteMany();
            await prisma.conversation.createMany({
                data: documents.map((document) => ({
                    title: document.title,
                    date: document.date,
                    authors: document.authors,
                    tags: document.tags,
                    tokens: document.tokens,
                    content: document.content,
                    questions: document.questions,
                    answers: document.answers
                })),
                skipDuplicates: true
            });
        } catch (err) {
            throw new Error('Error creating conversations:', err);
        }

        const fineTuningDataset = createFineTuningDataset(documents);
        const jsonlContent = fineTuningDataset.map((row) => JSON.stringify(row)).join('\n');
        await writeFile(DEST_FILE_TRAIN, jsonlContent);
        fineTune();
        process.exit(0);
    } catch (err) {
        throw new Error('Error parsing handbook:', err);
    }
}

async function walkDirectory(dirPath: string): Promise<MarkdownData[]> {
    const files = await readdir(dirPath, { withFileTypes: true });
    const documents: MarkdownData[] = [];
    for (const file of files) {
        const fullPath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
            documents.push(...(await walkDirectory(fullPath))); // Recursively call for subdirectories
        } else if (file.isFile() && path.extname(file.name) === '.md') {
            documents.push(await parseMarkdownFile(fullPath));
        }
    }
    return documents;
}

async function parseMarkdownFile(fileName: string) {
    const markdown = await readFile(fileName);
    const matter = grayMatter(markdown);
    const content = removeMarkdown(matter.content);
    const str = matter.data.title ? `${matter.data.title}\n\n` + content : content;

    const document: MarkdownData = {
        title: matter.data.title ? matter.data.title : null,
        date: matter.data.date ? moment(matter.data.date).unix() : null,
        authors: matter.data.authors ? matter.data.authors : [],
        tags: matter.data.tags ? matter.data.tags : []
    };

    const { text, tokens } = await limitTokens(str);
    document.tokens = tokens;
    document.content = text;
    return document;
}

function createFineTuningDataset(data: MarkdownData[]) {
    const rows = [];
    for (const item of data) {
        if (item.questions && item.answers && item.questions.length > 0 && item.answers.length > 0) {
            const questions = item.questions.split('\n');
            const answers = item.answers.split('\n');

            for (let i = 0; i < questions.length; i++) {
                const question = questions[i].trim().slice(2);
                const answer = answers[i].trim().slice(2);
                rows.push({
                    messages: [
                        { role: 'system', content: 'You are a factual chatbot to answer questions about Dwarves Foundation.' },
                        { role: 'user', content: question },
                        { role: 'assistant', content: answer + '  **STOP**' }
                    ]
                });
            }
        }
    }
    return rows;
}

generateSampleUser();
parseHandbook();
