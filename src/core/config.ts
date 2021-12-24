
const get = <T = string>(name: string, defaultValue: T = null, cast: (v: any) => T = (v) => v): T => {
    const val = process.env[name]
    if (!val) return defaultValue
    return cast(val)
}

const env = get('EXO_ENV')

const config = {
    env,
    logLevel: get('LOG_LEVEL'),
    version: get('VERSION'),
    exobaseApiUrl: get('EXOBASE_API_URL'),
    exobaseToken: get('EXOBASE_TOKEN'),
    githubWebhookSecret: get('GITHUB_WEBHOOK_SECRET'),
    stripeSecretKey: get('STRIPE_SECRET_KEY'),
    stripeWebhookSecret: get('STRIPE_WEBHOOK_SECRET')
}

export type Config = typeof config

export default config