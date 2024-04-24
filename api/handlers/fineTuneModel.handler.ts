import OpenAI from 'openai';
import { envs } from 'api/configs';
import { FineTuneModelDto } from 'api/dtos/out';
import { Handler } from 'api/interfaces';

const openai = new OpenAI({
    apiKey: envs.OPENAI_API_KEY
});

const getAll: Handler<FineTuneModelDto> = async (_, res) => {
    const fineTuneModels = await openai.fineTuning.jobs.list();
    const fineTuneModelIds = fineTuneModels.data.filter((model) => model.status === 'succeeded').map((model) => model.fine_tuned_model);

    return res.send({ data: fineTuneModelIds });
};

export const fineTuneModelHandler = {
    getAll
};
