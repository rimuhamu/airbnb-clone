import { chromium } from '@playwright/test';
import path from 'node:path';

import prismadb from '@/libs/prismadb';

async function globalSetup() {
  const storagePath = path.resolve(__dirname, 'storageState.json');
  const sessionToken = '04456e41-ec3b-4edf-92c1-48c14e57cacd2';
  await prismadb.user.upsert({
    where: {
      email: 'e2e@e2e.com',
    },
    create: {
      name: 'e2e',
      email: 'e2e@e2e.com',
      accounts: {
        create: {
          type: 'oauth',
          provider: 'github',
          providerAccountId: '2222222',
          access_token: 'ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt',
          token_type: 'bearer',
          scope: 'read:org,read:user,repo,user:email',
        },
      },
    },
    update: {},
  });

  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: storagePath });
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: 1661406204,
    },
  ]);
  await context.storageState({ path: storagePath });
  await browser.close();
}

export default globalSetup;
