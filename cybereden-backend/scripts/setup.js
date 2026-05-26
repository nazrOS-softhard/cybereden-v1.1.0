#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import crypto from 'crypto';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║     CyberEden Backend - Автоматический Setup                ║
╚════════════════════════════════════════════════════════════════╝
  `);

  const config = {};

  console.log('\n📱 GitHub OAuth');
  config.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || await question('  GitHub Client ID: ');
  config.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || await question('  GitHub Client Secret: ');

  console.log('\n📺 Twitch OAuth');
  config.TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || await question('  Twitch Client ID: ');
  config.TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET || await question('  Twitch Client Secret: ');

  console.log('\n🔐 JWT Secret');
  config.JWT_SECRET = process.env.JWT_SECRET || await question('  JWT Secret: ');
  if (!config.JWT_SECRET) {
    config.JWT_SECRET = crypto.randomBytes(32).toString('hex');
    console.log(`  ✅ Сгенерирован: ${config.JWT_SECRET}`);
  }

  console.log('\n🌐 API URL');
  config.API_URL = process.env.API_URL || await question('  API URL: ') || 'http://localhost:8787';

  console.log('\n🔗 CORS Origins');
  config.CORS_ORIGINS = process.env.CORS_ORIGINS || await question('  CORS Origins: ') || 'http://localhost:5173';

  console.log('\n☁️ R2 (опционально)');
  config.R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '';
  config.R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '';
  config.R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '';

  console.log('\n💾 D1 Database IDs');
  config.D1_DATABASE_ID = process.env.D1_DATABASE_ID || '';
  config.D1_PREVIEW_DATABASE_ID = process.env.D1_PREVIEW_DATABASE_ID || '';

  console.log('\n🗝️ KV Namespace IDs');
  config.KV_NAMESPACE_ID = process.env.KV_NAMESPACE_ID || '';
  config.KV_PREVIEW_NAMESPACE_ID = process.env.KV_PREVIEW_NAMESPACE_ID || '';

  console.log('\n📝 Генерируем .env файл...');
  const envContent = `
GITHUB_CLIENT_ID=${config.GITHUB_CLIENT_ID}
GITHUB_CLIENT_SECRET=${config.GITHUB_CLIENT_SECRET}
TWITCH_CLIENT_ID=${config.TWITCH_CLIENT_ID}
TWITCH_CLIENT_SECRET=${config.TWITCH_CLIENT_SECRET}
JWT_SECRET=${config.JWT_SECRET}
API_URL=${config.API_URL}
R2_ACCOUNT_ID=${config.R2_ACCOUNT_ID}
R2_ACCESS_KEY_ID=${config.R2_ACCESS_KEY_ID}
R2_SECRET_ACCESS_KEY=${config.R2_SECRET_ACCESS_KEY}
CORS_ORIGINS=${config.CORS_ORIGINS}
`;
  fs.writeFileSync('.env', envContent);
  console.log('  ✅ .env создан');

  console.log('\n📝 Генерируем wrangler.toml...');
  const wranglerContent = `
name = "cybereden-backend"
main = "src/worker.ts"
compatibility_date = "2025-05-26"

[vars]
GITHUB_CLIENT_ID = "${config.GITHUB_CLIENT_ID}"
GITHUB_CLIENT_SECRET = "${config.GITHUB_CLIENT_SECRET}"
TWITCH_CLIENT_ID = "${config.TWITCH_CLIENT_ID}"
TWITCH_CLIENT_SECRET = "${config.TWITCH_CLIENT_SECRET}"
JWT_SECRET = "${config.JWT_SECRET}"
CORS_ORIGINS = "${config.CORS_ORIGINS}"

[[d1_databases]]
binding = "DB"
database_name = "cybereden-db"
database_id = "${config.D1_DATABASE_ID || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'}"

[[r2_buckets]]
binding = "R2_AVATARS"
bucket_name = "cybereden-avatars"

[[r2_buckets]]
binding = "R2_ASSETS"
bucket_name = "cybereden-assets"

[[kv_namespaces]]
binding = "AUTH_CACHE"
id = "${config.KV_NAMESPACE_ID || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}"
`;
  fs.writeFileSync('wrangler.toml', wranglerContent);
  console.log('  ✅ wrangler.toml создан');

  console.log(`
✅ Setup завершён!

Далее:
1. npm install
2. npm run dev
3. npm run deploy:prod
`);
  rl.close();
}

main().catch(console.error);
