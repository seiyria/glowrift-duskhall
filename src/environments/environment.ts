export const environment = {
  production: true,
  platform: 'web',
  gameanalytics: {
    game: '',
    secret: '',
  },
  rollbar: {
    accessToken: '',
    hostBlockList: ['netlify.app'],
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
      client: {
        javascript: {
          code_version: '1.0',
          source_map_enabled: true,
          guess_uncaught_frames: true,
        },
      },
    },
  },
};
