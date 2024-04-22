import { config as configEnv } from 'dotenv';
import { str, cleanEnv } from 'envalid';

configEnv();

export const envs = cleanEnv(process.env, {
    OPENAI_API_KEY: str()
});
