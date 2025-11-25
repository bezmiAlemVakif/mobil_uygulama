import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bezmialem.vakifkart',
  appName: 'Bezmialem Vakıf Kart',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
