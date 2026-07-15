import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, programme, experience, motivation } = body
    if (!firstName || !lastName || !email || !phone || !programme || !experience || !motivation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // TODO: await supabase.from('applications').insert({...})
    // TODO: await resend.emails.send({...})
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
