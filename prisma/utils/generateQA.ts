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
            prompt: `Write 5 questions based on the text below\nText: ${content}\nQuestions:`,
            temperature: 0,
            max_tokens: 257,
            stop: ['\n\n']
        });
        return response.choices[0].text.trim();
    } catch (error) {
        throw new Error('Error generating questions:', error as Error);
    }
}

export async function generateAnswers(document: MarkdownData): Promise<string> {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Write 5 answers based on the text below\nText: ${document.content}\nQuestions: ${document.questions}\nAnswers:`,
            temperature: 0,
            max_tokens: 324,
            stop: ['\n\n']
        });
        return response.choices[0].text.trim();
    } catch (error) {
        throw new Error('Error generating answers:', error as Error);
    }
}
