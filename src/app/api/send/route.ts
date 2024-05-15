import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(req: NextRequest) {
  const json = req.json();
  const { username } = await json;
  console.log('enviando')  
  try {
    const data = await resend.emails.send({
      from: 'rubenacoorahua@gmail.com',
      to: ['practicante.sistemas@boston.com.pe'],
      subject: 'Hello world',
      text: 'Prueba1',
      react: EmailTemplate({ username, }),
    });
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}