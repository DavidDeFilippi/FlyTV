import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.defilippi.flytv',
  appName: 'Fly TV',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
