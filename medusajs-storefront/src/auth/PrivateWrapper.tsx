import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import Loading from '@/components/Loading/Loading'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import { PATHS } from '@/utils/enums'

type Props = {
	children: React.ReactNode
}

const PrivateWrapper: FC<Props> = ({ children }) => {
	const router = useRouter()
	const { data: customer, isLoading, isFetching } = useCustomerProfile()

	useEffect(() => {
		if (!isLoading && !isFetching && !customer) {
			router.push(PATHS.LOGIN)
		}
	}, [customer, isFetching, isLoading, router])

	if (!customer) {
		return <Loading height='100vh' />
	}

	return children
}

export default PrivateWrapper
