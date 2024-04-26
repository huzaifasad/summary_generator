import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY, // Replace with your actual API key
});
export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json(); 

    // Extract review text from the request body
    const reviewText: string = body.reviewText;
    console.log("Review Text:", reviewText);

    // Construct the prompt
    const prompt = `"${reviewText}" These are the reviews provided in array format. Please generate a detailed summary encompassing all aspects of the service and flavors mentioned in the reviews.`;

    const promptx = `Here are some reviews provided by users: 
    * ${reviewText}
    }
    
    Please generate a detailed summary encompassing all aspects of the service and flavors mentioned in the reviews. give me sumamry at least 3 lines or 50 words  and please give me positive and negative kewords also and give output like that :
    
    Summary: [Detailed summary] 
    Positive Keywords: [List of positive keywords extracted from the review]  
    Negative Keywords: [List of negative keywords extracted from the review]  
    the output must be same as above`;
    
    const completionx = await openai.chat.completions.create({
      messages: [{"role": "system", "content": `${promptx}`}],
      model: "gpt-3.5-turbo",
    });


    console.log(completionx.choices[0].message.content);

    // Request completion from OpenAI API
    // const completion = await openai.completions.create({
    //   model: 'gpt-3.5-turbo-instruct',
    //   prompt: promptx,
    //   temperature: 0.1,
    // });

    // Extract the generated summary from the completion
    const summary = completionx.choices[0].message.content;
    // console.log("Generated Summary:", summary);
  

    // Placeholder for keyword extraction (you can replace this with your actual implementation)
    // For demonstration purposes, let's assume we extract positive and negative keywords from the summary
    // Example implementation:
    // positiveKeywords.push("Great service");
    // negativeKeywords.push("Not enough variety");

    // Return the generated summary and extracted keywords in JSON format
 


    // Return the generated summary in the response
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    // Handle errors and return appropriate response
    return NextResponse.json({ message: "An error occurred. Please try again later." }, { status: 500 });
  }
}
