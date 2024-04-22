import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
// import { hashSync } from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
import grayMatter from 'gray-matter';
import moment from 'moment';
import { removeMarkdown } from './utils/removeMarkdown';
import { limitTokens } from './utils/tokenize';

type MarkdownData = {
    title?: string | null;
    date?: number | null;
    description?: string | null;
    authors?: string[] | null;
    tags?: string[] | null;
    tokens?: number | null;
    content?: string | null;
    questions?: string[] | null;
    answers?: string[] | null;
};

const MD_DIRECTORY_PATH = './prisma/handbook';
const DIST_FILE_PATH = './prisma/test.json';
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
        const documents = await walkDirectory(MD_DIRECTORY_PATH); // Use the new walkDirectory function
        await writeFile(
            DIST_FILE_PATH,
            JSON.stringify({
                documents
            })
        );
    } catch (err) {
        console.error(err);
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
        description: matter.data.description ? matter.data.description : null,
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
