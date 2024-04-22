import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
// import { hashSync } from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
import grayMatter from 'gray-matter';
import moment from 'moment';
import { removeMarkdown } from './utils/removeMarkdown';
import { limitTokens } from './utils/tokenize';
import { generateQuestions, generateAnswers } from './utils/generateQA';
import { MarkdownData } from './utils/configType';

const MD_DIRECTORY_PATH = './prisma/handbook';
const DIST_FILE_PATH = './prisma/qa.json';
// const prisma = new PrismaClient();
// const SALT_ROUNDS = 10;

// const user = {
//     email: 'phu.nguyen2310@hcmut.edu.vn',
//     password: '123456789'
// };

// async function generateSampleUser() {
//     const hashPassword = hashSync(user.password, SALT_ROUNDS);
//     const sampleUser = await prisma.user.create({
//         data: {
//             email: user.email,
//             password: hashPassword
//         }
//     });
//     console.log(sampleUser);
//     process.exit(0);
// }

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
            await writeFile(DIST_FILE_PATH, JSON.stringify({ documents }));
        } catch (err) {
            throw new Error('Error writing qa.json:', err);
        }
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
        authors: matter.data.authors ? matter.data.authors : null,
        tags: matter.data.tags ? matter.data.tags : null
    };

    const { text, tokens } = await limitTokens(str);
    document.tokens = tokens;
    document.content = text;
    return document;
}

// generateSampleUser();
parseHandbook();
