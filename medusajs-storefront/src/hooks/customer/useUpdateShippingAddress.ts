import { StorePostCustomersCustomerAddressesAddressReq } from '@medusajs/medusa'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

type UpdateShippingAddressData = { addressId: string } & StorePostCustomersCustomerAddressesAddressReq

const useUpdateShippingAddress = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: UpdateShippingAddressData) => {
			const { customer } = await medusa.customers.addresses.updateAddress(data.addressId, data)
			return { customer }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.API_GET_CUSTOMER_PROFILE] })
		}
	})
}

export default useUpdateShippingAddress
