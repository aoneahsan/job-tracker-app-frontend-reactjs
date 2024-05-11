import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zaions.jobTracker',
  appName: 'jobTracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
