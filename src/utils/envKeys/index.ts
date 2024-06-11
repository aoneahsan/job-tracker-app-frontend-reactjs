const _env = import.meta.env;

// Backend url for apis
const apiUrl = (_env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL) ?? '';

const ENVS = {
  apiUrl,
  cryptoSecret: _env.VITE_CRYPTO_SECRET ?? 'job-tracker-app-secret',
  fbConfig: {
    apiKey: _env.VITE_FB_API_KEY ?? '',
    authDomain: _env.VITE_FB_AUTH_DOMAIN ?? '',
    dbUrl: _env.VITE_FB_DB_URL ?? '',
    projectId: _env.VITE_FB_PROJECT_ID ?? '',
    storageBucket: _env.VITE_FB_STORAGE_BUCKET ?? '',
    messagingSenderId: _env.VITE_FB_MS_ID ?? '',
    appId: _env.VITE_FB_APP_ID ?? '',
    measurementId: _env.VITE_FB_MEASUREMENT_ID ?? ''
  }
};

/**
 * Check if the required environment variables are set
 */
export const checkZEnv = () => {
  const missingVariables: string[] = [];

  if (!ENVS?.fbConfig?.apiKey) missingVariables.push('VITE_FB_API_KEY');
  if (!ENVS?.fbConfig?.authDomain) missingVariables.push('VITE_FB_AUTH_DOMAIN');
  if (!ENVS?.fbConfig?.dbUrl) missingVariables.push('VITE_FB_DB_URL');
  if (!ENVS?.fbConfig?.projectId) missingVariables.push('VITE_FB_PROJECT_ID');
  if (!ENVS?.fbConfig?.storageBucket) missingVariables.push('VITE_FB_STORAGE_BUCKET');
  if (!ENVS?.fbConfig?.messagingSenderId) missingVariables.push('VITE_FB_MS_ID');
  if (!ENVS?.fbConfig?.appId) missingVariables.push('VITE_FB_APP_ID');
  if (!ENVS?.fbConfig?.measurementId) missingVariables.push('VITE_FB_MEASUREMENT_ID');

  if (missingVariables.length > 0) {
    throw new Error(`Missing the following environment variables: ${missingVariables.join(', ')}`);
  }
}

export default ENVS;
