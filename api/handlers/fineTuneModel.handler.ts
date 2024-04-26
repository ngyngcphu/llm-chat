import OpenAI from 'openai';
import { envs } from '@api/configs';
import { FineTuneModelDto } from '@api/dtos/out';
import { Handler } from '@api/interfaces';

const openai = new OpenAI({
    apiKey: envs.OPENAI_API_KEY
});

const getAll: Handler<FineTuneModelDto> = async (_, res) => {
    const fineTuneModels = await openai.fineTuning.jobs.list();
    const fineTuneModelIds = fineTuneModels.data.filter((model) => model.status === 'succeeded').map((model) => model.fine_tuned_model);
    const response = fineTuneModelIds.map((id) => ({ id: id, name: id ? id.split('::')[1] : '' }));

    return res.send({ data: response });
};

export const fineTuneModelHandler = {
    getAll
};
