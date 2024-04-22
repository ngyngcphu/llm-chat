import { Tiktoken, TiktokenBPE, TiktokenEncoding, TiktokenModel, getEncodingNameForModel } from 'js-tiktoken';
import { SentenceTokenizer } from 'natural';

const cache: Record<string, TiktokenBPE> = {};

async function getEncoding(encoding: TiktokenEncoding, extendedSpecialTokens?: Record<string, number>) {
    if (!(encoding in cache)) {
        const res = await fetch(`https://tiktoken.pages.dev/js/${encoding}.json`);

        if (!res.ok) throw new Error('Failed to fetch encoding');
        cache[encoding] = await res.json();
    }
    return new Tiktoken(cache[encoding], extendedSpecialTokens);
}

async function encodingForModel(model: TiktokenModel, extendedSpecialTokens?: Record<string, number>) {
    return getEncoding(getEncodingNameForModel(model), extendedSpecialTokens);
}

async function countTokens(text: string) {
    const encodings = await encodingForModel('gpt-3.5-turbo');
    const tokens = encodings.encode(text);
    return tokens.length;
}

export async function limitTokens(text: string, maxLength = 4096): Promise<{ text: string; tokens: number }> {
    const textTokens = await countTokens(text);
    if (textTokens > maxLength) {
        const sentenceTokenizer = new SentenceTokenizer();
        const sentences = sentenceTokenizer.tokenize(text);
        let currentTokens = 0;
        for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i];
            const sentenceTokens = await countTokens(sentence);
            currentTokens += sentenceTokens;
            if (currentTokens > maxLength) {
                return {
                    text: sentences.slice(0, i).join('. '),
                    tokens: currentTokens - sentenceTokens
                };
            }
        }
    }
    return {
        text,
        tokens: textTokens
    };
}
