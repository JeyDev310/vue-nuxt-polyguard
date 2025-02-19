import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  // tracesSampleRate: 1.0,
  tracesSampleRate: 0.1,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  // replaysSessionSampleRate: 0.1,
  replaysSessionSampleRate: 0.05,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  // replaysOnErrorSampleRate: 1.0,
  replaysOnErrorSampleRate: 0.5,

  // If you don't want to use Session Replay, just remove the line below:
  integrations: [Sentry.replayIntegration()],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
