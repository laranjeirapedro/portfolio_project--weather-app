import { NextRequest, NextResponse } from 'next/server';
import { detectIntent } from '../../../lib/dialogflow';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    const sessionId = uuidv4();
    const reply = await detectIntent(sessionId, message);

    console.log('Dialogflow reply:', reply);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error communicating with Dialogflow:', error);
    return NextResponse.json({ error: 'Error communicating with Dialogflow' }, { status: 500 });
  }
}