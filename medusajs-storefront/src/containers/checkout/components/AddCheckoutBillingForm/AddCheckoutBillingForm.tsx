import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import Checkbox from '@/atoms/Checkbox/Checkbox'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { useStore } from '@/providers/StoreProvider'
import { AddCheckoutBillingFormFields, useAddCheckoutBillingFormSchema } from '@/schemas/addCheckoutBillingSchemas'

import * as SC from './AddCheckoutBillingFormStyles'

type AddCheckoutBillingFormProps = {
	onSubmitted: () => void
}

const AddCheckoutBillingForm = ({ onSubmitted }: AddCheckoutBillingFormProps) => {
	const schema = useAddCheckoutBillingFormSchema()
	const t = useTranslations('containers.checkout')

	const { updateBillingAddress, cart } = useStore()
	const [sameAsShipping, setSameAsShipping] = useState(false)

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<AddCheckoutBillingFormFields>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues: {
			address1: cart?.billing_address?.address_1 ?? '',
			address2: cart?.billing_address?.address_2 ?? '',
			city: cart?.billing_address?.city ?? '',
			countryCode: cart?.billing_address?.country_code ?? '',
			postalCode: cart?.billing_address?.postal_code ?? ''
		}
	})

	const handleSameAsShipping = () => {
		reset({
			address1: cart?.shipping_address?.address_1 ?? '',
			address2: cart?.shipping_address?.address_2 ?? '',
			city: cart?.shipping_address?.city ?? '',
			countryCode: cart?.shipping_address?.country_code ?? '',
			postalCode: cart?.shipping_address?.postal_code ?? ''
		})
	}

	const handleFormSubmit = async (data: AddCheckoutBillingFormFields) => {
		updateBillingAddress(
			{
				address_1: data.address1,
				address_2: data.address2,
				city: data.city,
				company: data.company,
				country_code: data.countryCode,
				postal_code: data.postalCode
			},
			{
				onSuccess: () => {
					onSubmitted()
				}
			}
		)
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
			<Checkbox
				onChange={(selected) => {
					setSameAsShipping(selected)
					if (selected) {
						handleSameAsShipping()
					}
				}}
				isSelected={sameAsShipping}
				label={t('sameAsShipping')}
			/>
			<HookFormField
				label={t('address1')}
				placeholder={t('enterAddress1')}
				component={InputField}
				control={control}
				name='address1'
				required
				disabled={sameAsShipping}
			/>
			<HookFormField
				label={t('address2')}
				placeholder={t('enterAddress2')}
				component={InputField}
				control={control}
				name='address2'
				required
				disabled={sameAsShipping}
			/>
			<HookFormField
				label={t('city')}
				placeholder={t('enterCity')}
				component={InputField}
				control={control}
				name='city'
				required
				disabled={sameAsShipping}
			/>
			<HookFormField
				label={t('countryCode')}
				placeholder={t('enterCountryCode')}
				component={InputField}
				control={control}
				name='countryCode'
				required
				disabled={sameAsShipping}
			/>
			<HookFormField
				label={t('postalCode')}
				placeholder={t('enterPostalCode')}
				component={InputField}
				control={control}
				name='postalCode'
				required
				disabled={sameAsShipping}
			/>
			<HookFormField
				label={t('company')}
				placeholder={t('enterCompany')}
				component={InputField}
				control={control}
				name='company'
				required
				disabled={sameAsShipping}
			/>
			<Button variant='primary' size='large' type='submit' isDisabled={isSubmitting} isPending={isSubmitting}>
				{t('submitButton')}
			</Button>
		</SC.Form>
	)
}

export default AddCheckoutBillingForm
