import { PrismaClient } from '@prisma/client';
import { readFile /*, readdir, writeFile*/ } from 'fs/promises';
// import path from 'path';
import { hashSync } from 'bcrypt';
// import grayMatter from 'gray-matter';
// import moment from 'moment';
// import { removeMarkdown } from './utils/removeMarkdown';
// import { limitTokens } from './utils/tokenize';
// import { generateQuestions, generateAnswers } from './utils/generateQA';
import { MarkdownData } from './utils/configType';
// import { fineTune } from './utils/fineTune';

// const MD_DIRECTORY_PATH = './prisma/handbook';
// const DEST_FILE_TRAIN = './prisma/qa_train.jsonl';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const user = {
    email: 'phu.nguyen2310@hcmut.edu.vn',
    password: '123456789',
    name: 'Nguyen Ngoc Phu'
};

async function generateSampleUser() {
    const hashPassword = hashSync(user.password, SALT_ROUNDS);
    try {
        await prisma.user.create({
            data: {
                email: user.email,
                password: hashPassword,
                name: user.name
            }
        });
    } catch (err) {
        throw new Error('Error creating user:', err as Error);
    }
}

// async function parseHandbook() {
//     try {
//         const documents = await walkDirectory(MD_DIRECTORY_PATH);

//         await Promise.all(
//             documents.map(async (document) => {
//                 if (!document.content) {
//                     document.questions = null;
//                     return;
//                 }
//                 try {
//                     const questions = await generateQuestions(document.content);
//                     document.questions = questions;
//                     return;
//                 } catch (error) {
//                     document.questions = null;
//                     throw new Error('Error generating questions:', error as Error);
//                 }
//             })
//         );

//         await Promise.all(
//             documents.map(async (document) => {
//                 if (!document.questions || (document.questions && document.questions.length === 0)) {
//                     document.answers = null;
//                     return;
//                 }
//                 try {
//                     const answers = await generateAnswers(document);
//                     document.answers = answers;
//                     return;
//                 } catch (error) {
//                     document.answers = null;
//                     throw new Error('Error generating answers:', error as Error);
//                 }
//             })
//         );

//         const fineTuningDataset = createFineTuningDataset(documents);
//         const jsonlContent = fineTuningDataset.map((row) => JSON.stringify(row)).join('\n');
//         await writeFile(DEST_FILE_TRAIN, jsonlContent);
//         await fineTune();
//         process.exit(0);
//     } catch (err) {
//         throw new Error('Error parsing handbook:', err as Error);
//     }
// }

// async function walkDirectory(dirPath: string): Promise<MarkdownData[]> {
//     const files = await readdir(dirPath, { withFileTypes: true });
//     const documents: MarkdownData[] = [];
//     for (const file of files) {
//         const fullPath = path.join(dirPath, file.name);
//         if (file.isDirectory()) {
//             documents.push(...(await walkDirectory(fullPath))); // Recursively call for subdirectories
//         } else if (file.isFile() && path.extname(file.name) === '.md') {
//             documents.push(await parseMarkdownFile(fullPath));
//         }
//     }
//     return documents;
// }

// async function parseMarkdownFile(fileName: string) {
//     const markdown = await readFile(fileName, 'utf-8');
//     const matter = grayMatter(markdown);
//     const content = removeMarkdown(matter.content);
//     const str = matter.data.title ? `${matter.data.title}\n\n` + content : content;

//     const document: MarkdownData = {
//         title: matter.data.title ? matter.data.title : null,
//         date: matter.data.date ? moment(matter.data.date).unix() : null,
//         authors: matter.data.authors ? matter.data.authors : [],
//         tags: matter.data.tags ? matter.data.tags : []
//     };

//     const { text, tokens } = await limitTokens(str);
//     document.tokens = tokens;
//     document.content = text;
//     return document;
// }

// function createFineTuningDataset(data: MarkdownData[]) {
//     const rows = [];
//     for (const item of data) {
//         if (item.questions && item.answers && item.questions.length > 0 && item.answers.length > 0) {
//             const questions = item.questions.split('\n');
//             const answers = item.answers.split('\n');

//             for (let i = 0; i < questions.length; i++) {
//                 const question = questions[i].trim().slice(2);
//                 const answer = answers[i].trim().slice(2);
//                 rows.push({
//                     messages: [
//                         { role: 'system', content: 'You are a factual chatbot to answer questions about Dwarves Foundation.' },
//                         { role: 'user', content: question },
//                         { role: 'assistant', content: answer + '  **STOP**' }
//                     ]
//                 });
//             }
//         }
//     }
//     return rows;
// }
// parseHandbook();

async function generateData() {
    const fileContent: string = await readFile('./prisma/qa.json', 'utf-8');
    const documents: { documents: MarkdownData[] } = JSON.parse(fileContent);
    await Promise.all(
        documents.documents.map(async (document) => {
            try {
                await prisma.context.create({
                    data: {
                        title: document.title,
                        date: document.date,
                        authors: document.authors ?? [],
                        tags: document.tags ?? [],
                        tokens: document.tokens,
                        content: document.content,
                        questions: {
                            createMany: {
                                data: document.questions?.split('\n').map((question) => ({ content: question })) ?? []
                            }
                        }
                    },
                    include: {
                        questions: true
                    }
                });
            } catch (error) {
                throw error;
            }
        })
    );

    const questions = await prisma.sampleQuestion.findMany();
    const qas = documents.documents
        .map((document) => ({ answers: document.answers, questions: document.questions }))
        .map((qa) => ({ answers: qa.answers?.split('\n') ?? [], questions: qa.questions?.split('\n') ?? [] }));

    await Promise.all(
        questions.map(async (question) => {
            const qaPair = qas.find((qa) => qa.questions.includes(question.content));
            if (qaPair) {
                // Find the index of the question in the QA pair
                const questionIndex = qaPair.questions.findIndex((q) => q === question.content);
                if (questionIndex !== -1) {
                    // Use the index to get the corresponding answer
                    const answer = qaPair.answers[questionIndex];
                    // Create the sample answer
                    await prisma.sampleAnswer.create({
                        data: {
                            content: answer,
                            contextId: question.contextId,
                            sampleQuestionId: question.id
                        }
                    });
                }
            }
        })
    );
}

async function main() {
    try {
        await generateSampleUser();
        await generateData();
        process.exit(0);
    } catch (error) {
        throw error;
    }
}

main();
