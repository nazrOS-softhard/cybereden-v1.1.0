import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET

function verifySignature(payload: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET!)
  const digest = hmac.update(payload).digest('hex')
  return signature === `sha256=${digest}`
}

export async function POST(req: Request) {
  const payload = await req.text()
  const signature = req.headers.get('x-hub-signature-256') || ''

  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = req.headers.get('x-github-event')
  if (event !== 'push') {
    return NextResponse.json({ error: 'Only push events supported' }, { status: 400 })
  }

  const data = JSON.parse(payload)
  const githubUsername = data.sender.login

  // Найти Кибера по github_username
  const { data: cyber } = await supabase
    .from('cybers')
    .select('id, xp')
    .eq('github_username', githubUsername)
    .single()

  if (!cyber) {
    return NextResponse.json({ error: 'Кибер не привязан' }, { status: 404 })
  }

  // Определить количество ПХ за коммит
  const branch = data.ref.replace('refs/heads/', '')
  let px = 0
  if (branch === 'main' || branch === 'master') px = 10
  else if (branch.startsWith('feature/')) px = 5
  else if (branch.startsWith('fix/')) px = 3
  else if (branch.startsWith('docs/')) px = 2
  else px = 1

  // Обновить ПХ
  const newXp = cyber.xp + px
  await supabase
    .from('cybers')
    .update({ xp: newXp })
    .eq('id', cyber.id)

  return NextResponse.json({ success: true, newXp })
}