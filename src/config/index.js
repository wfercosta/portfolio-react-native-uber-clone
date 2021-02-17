import env from 'react-native-config';

const config = {
    apiKey: env.GOOGLE_MAPS_API_KEY || 'NO_API_KEY_CONFIGURED',
};

export default config;
