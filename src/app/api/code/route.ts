import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { CheckSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import toast from "react-hot-toast";




const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const instructionMessage: ChatCompletionMessageParam = {
    role: 'system',
    content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.'
}

export async function POST (
    req: Request 
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 }); 
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();

        const isPro = await CheckSubscription();

        if (!freeTrial && !isPro) {
        return new NextResponse("Free trial limit reached", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [instructionMessage, ...messages]
          });

          if (!isPro){
            await increaseApiLimit();}
        
          return NextResponse.json(response.choices[0].message)
    }
    catch (error) {
    
        toast.error("Something went wrong");
        return new NextResponse("Internal Server Error", { status: 500 })
        }
    }
