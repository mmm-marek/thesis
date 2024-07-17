import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'

import { useStore } from '@/providers/StoreProvider'
import { PATHS } from '@/utils/enums'

const StripeForm = () => {
	const router = useRouter()
	const stripe = useStripe()
	const elements = useElements()
	const { cart, completePayment } = useStore()

	const handlePayment: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault()

		const cartId = cart?.id
		const clientSecret: string = cart?.payment_session?.data.client_secret as string

		if (!elements) return null

		const cardElement = elements.getElement(CardElement)

		if (!clientSecret || !cartId || !clientSecret || !elements || !cardElement || !stripe) return null

		return stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement,
					billing_details: {
						email: cart.email,
						phone: cart.billing_address.phone,
						address: {
							city: cart.billing_address.city,
							country: cart.billing_address.country_code,
							line1: cart.billing_address.address_1,
							line2: cart.billing_address.address_2,
							postal_code: cart.billing_address.postal_code
						}
					}
				}
			})
			.then(() => {
				completePayment({
					onSuccess: () => router.push(PATHS.ORDER_CONFIRMED)
				})
			})
	}

	return (
		<form>
			<CardElement />
			<button onClick={handlePayment} type='submit'>
				Submit
			</button>
		</form>
	)
}

export default StripeForm
