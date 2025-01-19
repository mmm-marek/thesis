import { useStore } from '@/providers/StoreProvider'

import * as SC from './ShippingAddressPickerStyles'
import { ShippingAddress } from './types'

type ShippingAddressPickerProps = {
	onAddressChange: (address: ShippingAddress) => void
	shippingAddresses: ShippingAddress[]
}

const ShippingAddressPicker = ({ onAddressChange, shippingAddresses }: ShippingAddressPickerProps) => {
	const { updateShippingAddress, cart } = useStore()

	return (
		<SC.RadioGroup
			defaultValue={cart?.shipping_address?.address_1}
			onChange={(value) => {
				const selectedAddress = shippingAddresses.find((address) => address.address1 === value)
				if (!selectedAddress) {
					return
				}
				updateShippingAddress(
					{
						address_1: selectedAddress.address1,
						address_2: selectedAddress.address2,
						city: selectedAddress.city,
						country_code: selectedAddress.countryCode,
						postal_code: selectedAddress.postalCode
					},
					{
						onSuccess: () => {
							onAddressChange(selectedAddress)
						}
					}
				)
			}}
		>
			{shippingAddresses.map((address) => (
				<SC.Radio value={address.address1} key={address.address1}>
					<SC.AddressWrapper>
						<SC.AddressName>{address.name}</SC.AddressName>
						<SC.AddressDescription>{address.address1}</SC.AddressDescription>
						<SC.AddressDescription>{address.address2}</SC.AddressDescription>
						<SC.AddressDescription>
							{address.postalCode}, {address.city}
						</SC.AddressDescription>
					</SC.AddressWrapper>
				</SC.Radio>
				// <SC.OptionLabel key={address.address1} htmlFor={address.address1}>
				// 	<Radio value={address.address1} id={address.address1}>
				// 		<SC.ContentWrapper>
				// 			<SC.AddressName>{address.name}</SC.AddressName>
				// 			<SC.AddressWrapper>
				// 				<SC.Address>{address.address1}</SC.Address>
				// 				{address.address2 && <SC.Address>{address.address2}</SC.Address>}
				// 				<SC.Address>
				// 					{address.postalCode}, {address.city}
				// 				</SC.Address>
				// 			</SC.AddressWrapper>
				// 		</SC.ContentWrapper>
				// 	</Radio>
				// </SC.OptionLabel>
			))}
		</SC.RadioGroup>
	)
}

export default ShippingAddressPicker
