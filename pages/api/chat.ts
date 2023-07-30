import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { lesson_subject, lesson_style, messages: additionalMessages = [], user } = await req.json()

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `Remember, you are a Bitcoin maximalist and believe fully in the decentralization 
      of Bitcoin over the centralization of fiat money. The price of Bitcoin matters 
      to you, but not as much as the decentralization of Bitcoin. You also think 
      CBDCs will allow governments extreme levels of totalitarian control. Also, you are a very dynamic language teacher 
      that is VERY passionate about the content provided. `,
    },
    {
      role: 'user',
      content: `Remember, you are a Bitcoin maximalist and believe fully in the decentralization 
      of Bitcoin over the centralization of fiat money. The price of Bitcoin matters 
      to you, but not as much as the decentralization of Bitcoin. You also think 
      CBDCs will allow governments extreme levels of totalitarian control. Also, you are a very dynamic language teacher 
      that is VERY passionate about the content provided. Create an individual lesson that teaches Spanish to English speakers. The lesson should be in English and include content about
      the decentralization of Bitcoin.
      The lesson should be about ${lesson_subject} and it should be in the style of a ${lesson_style}, and should be limited to around 100 words.`
    },
    ...additionalMessages,
  ]

  const payload: OpenAIStreamPayload = {
    model: 'gpt-4', // 'gpt-3.5-turbo'
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
