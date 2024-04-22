import OpenAI from 'openai';
import { envs } from './configEnv';
import { MarkdownData } from './configType';

const openai = new OpenAI({
    apiKey: envs.OPENAI_API_KEY
});

export async function generateQuestions(content: string): Promise<string> {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Write 7 questions based on the text below\n\nText: ${content}\n\nQuestions:`,
            temperature: 0,
            max_tokens: 257,
            stop: ['\n\n']
        });
        return response.choices[0].text.trim();
    } catch (error) {
        throw new Error('Error generating questions:', error);
    }
}

export async function generateAnswers(document: MarkdownData): Promise<string> {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Write 7 answers based on the text below\n\nText: ${document.content}\n\nQuestions:\n${document.questions}\n\nAnswers:`,
            temperature: 0,
            max_tokens: 257,
            stop: ['\n\n']
        });
        return response.choices[0].text.trim();
    } catch (error) {
        throw new Error('Error generating answers:', error);
    }
}
