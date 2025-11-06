import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
})

export interface VSPromptParams {
  issue: string
  creativityLevel: number
  templateType?: string
}

export interface VSIdeaResult {
  idea: string
  probability: string
  reasoning: string
}

export async function generateVSIdeas(
  params: VSPromptParams
): Promise<VSIdeaResult[]> {
  const { issue, creativityLevel } = params

  const systemPrompt = `당신은 의왕시 정책혁신팀을 돕는 AI 어시스턴트입니다.
버벌라이즈드 샘플링(Verbalized Sampling, VS) 기법을 사용하여 창의적이고 실현 가능한 정책 대안을 생성합니다.

다음 현안에 대해, 확률 ${creativityLevel} 이하의 창의적이고 실현 가능한 정책 대안 5가지를 각 예상 확률과 함께 생성하십시오.

각 아이디어는 다음 형식으로 제시해주세요:
- 아이디어: [구체적인 정책 대안]
- 예상 확률: [0.01 ~ ${creativityLevel} 사이의 값]
- 근거: [왜 이 아이디어가 효과적일 수 있는지 간단한 설명]

중요:
1. 각 아이디어는 서로 다른 접근 방식을 사용해야 합니다
2. 실현 가능성과 창의성의 균형을 맞춰주세요
3. 의왕시의 특성(ITS 인프라, 철도박물관 등)을 고려해주세요
4. 확률이 낮을수록 더 창의적이지만 실현 가능해야 합니다`

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: issue,
        },
      ],
    })

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : ""

    // 응답 파싱
    const ideas = parseVSResponse(responseText)
    return ideas
  } catch (error) {
    console.error("Error calling Claude API:", error)
    throw error
  }
}

function parseVSResponse(text: string): VSIdeaResult[] {
  const ideas: VSIdeaResult[] = []
  const sections = text.split(/\n\n(?=\d+\.|아이디어 \d+|##)/)

  for (const section of sections) {
    const ideaMatch = section.match(/아이디어[:\s]+(.+?)(?=\n|예상 확률|$)/s)
    const probMatch = section.match(/예상 확률[:\s]+([\d.]+)/i)
    const reasoningMatch = section.match(/근거[:\s]+(.+?)(?=\n\n|$)/s)

    if (ideaMatch && probMatch) {
      ideas.push({
        idea: ideaMatch[1].trim(),
        probability: probMatch[1].trim(),
        reasoning: reasoningMatch ? reasoningMatch[1].trim() : "",
      })
    }
  }

  // 파싱에 실패한 경우 전체 텍스트를 하나의 아이디어로 반환
  if (ideas.length === 0 && text.trim()) {
    ideas.push({
      idea: text.trim(),
      probability: "0.05",
      reasoning: "AI 응답을 파싱할 수 없습니다",
    })
  }

  return ideas
}

export async function* streamVSIdeas(
  params: VSPromptParams
): AsyncGenerator<string> {
  const { issue, creativityLevel } = params

  const systemPrompt = `당신은 의왕시 정책혁신팀을 돕는 AI 어시스턴트입니다.
버벌라이즈드 샘플링(Verbalized Sampling, VS) 기법을 사용하여 창의적이고 실현 가능한 정책 대안을 생성합니다.

다음 현안에 대해, 확률 ${creativityLevel} 이하의 창의적이고 실현 가능한 정책 대안 5가지를 각 예상 확률과 함께 생성하십시오.

각 아이디어는 다음 형식으로 제시해주세요:
- 아이디어: [구체적인 정책 대안]
- 예상 확률: [0.01 ~ ${creativityLevel} 사이의 값]
- 근거: [왜 이 아이디어가 효과적일 수 있는지 간단한 설명]`

  try {
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: issue,
        },
      ],
    })

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        yield chunk.delta.text
      }
    }
  } catch (error) {
    console.error("Error streaming Claude API:", error)
    throw error
  }
}
