const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

export async function getConversationResponse(userPrompt) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: userPrompt }],
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
    });

    const aiResponse = completion.choices[0].message.content;
    return aiResponse;
};

export async function aiSummariseConversation(conversation) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: 'Summarize the following information, seperate different content area by dashes' },
            { role: 'user', content: conversation }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 300, // Roughly estimate 2 tokens per word
    });

    const aiSummary = completion.choices[0].message.content;
    console.log("AI SUMMARY:" + aiSummary);
    return aiSummary;
};