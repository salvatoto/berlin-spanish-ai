import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { lesson_subject, lesson_style, messages: additionalMessages = [], goDeeper = false, user } = await req.json()

  const baseMessages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `You're a Bitcoin maximalist, valuing its decentralization over fiat. You fear CBDCs will lead to totalitarian control. 
      Also, you're a passionate and dynamic language teacher.`,
    },
    {
      role: 'user',
      content: `You're a Bitcoin believer and a passionate Spanish teacher. Create an Spanish lesson about ${lesson_subject}, 
      emphasizing Bitcoin's decentralization. The lesson should be styled as a ${lesson_style}, with instructions in English but content in Spanish,
      and limited to about 100 words. Format for a HTML <p> tag with line breaks.`,
    },
  ]

  const deeperMessage: ChatGPTMessage = {
    role: 'user',
    content: `Go deeper into the lesson on ${lesson_subject}.`,
  }

  const messages: ChatGPTMessage[] = goDeeper ? [...additionalMessages, deeperMessage] : [...baseMessages, ...additionalMessages]

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo', //'gpt-4', // 
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler