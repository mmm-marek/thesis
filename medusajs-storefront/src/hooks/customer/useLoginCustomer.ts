import { useMutation } from '@tanstack/react-query'

import { useStore } from '@/providers/StoreProvider'
import { MSG_TYPE } from '@/utils/enums'
import { showNotifications } from '@/utils/helpers'
import { medusa } from '@/utils/medusaHelpers'

type LoginUserMutationArgs = Parameters<typeof medusa.auth.authenticate>[0]

const useLoginCustomer = () => {
	const { associateCustomerToCart } = useStore()

	return useMutation({
		mutationFn: async ({ email, password }: LoginUserMutationArgs) => {
			const res = await medusa.auth.authenticate({
				email,
				password
			})
			return res.customer
		},
		onSuccess: () => {
			associateCustomerToCart()
		},
		onError: () => {
			showNotifications([{ type: MSG_TYPE.ERROR, message: 'Login failed' }])
		}
	})
}

export default useLoginCustomer
