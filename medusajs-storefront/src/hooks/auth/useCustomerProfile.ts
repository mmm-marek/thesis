import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/utils/enums'
import { medusa } from '@/utils/medusaHelpers'

const useCustomerProfile = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.API_GET_CUSTOMER_PROFILE],
		queryFn: async () => {
			const { customer } = await medusa.auth.getSession()
			return customer
		}
	})
}

export default useCustomerProfile
