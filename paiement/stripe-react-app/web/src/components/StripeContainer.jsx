import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const stripeTestPromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_TEST)

export default function StripeContainer({total }) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm total={total}/>
		</Elements>
	)
}
