import _ from 'radash'
import makeApi, { ExobaseApi } from '../../core/api'
import config from '../../core/config'
import { useStripeWebhook, StripeWebhookArgs } from 'exo-use-stripe-webhook'

import type { Props } from '@exobase/core'
import { useService } from '@exobase/hooks'
import { useVercel } from '@exobase/vercel'

interface Services {
  api: ExobaseApi
}

/**
 * We're really just looking at the type here
 * and routing to the correct handler function 
 * for that specific event type.
 */
async function handleStripeEvent(props: Props<StripeWebhookArgs, Services>): Promise<void> {
  const { type } = props.args
  if (type === 'checkout.session.completed') await handleCheckoutComplete(props)
  if (type === 'invoice.paid') await handleInvoicePaid(props)
  if (type === 'invoice.payment_failed') await handleFailedPayment(props)
  if (type === 'customer.subscription.deleted') await handleSubscriptionCanceled(props)
  console.warn(`No handler found for stripe webhook event (${type})`)
}

async function handleCheckoutComplete({ args, services }: Props<StripeWebhookArgs, Services>): Promise<void> {
  const { api } = services
}

async function handleInvoicePaid({ args, services }: Props<StripeWebhookArgs, Services>): Promise<void> {
  const { api } = services
}

async function handleFailedPayment({ args, services }: Props<StripeWebhookArgs, Services>): Promise<void> {
  const { api } = services
}

async function handleSubscriptionCanceled({ args, services }: Props<StripeWebhookArgs, Services>): Promise<void> {
  const { api } = services
}

export default _.compose(
  useVercel(),
  useStripeWebhook({
    webhookSecret: config.stripeWebhookSecret,
    stripeSecretKey: config.stripeSecretKey
  }),
  useService<Services>({
    api: makeApi()
  }),
  handleStripeEvent
)