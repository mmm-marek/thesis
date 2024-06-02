import { Modal } from 'antd'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import useAddShippingAddress from '@/hooks/customer/useAddShippingAddress'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import { AddShippingAddressFormSchema } from '@/schemas/addShippingAddressSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './AddShippingAddressFormStyles'
import { AddShippingAddressFormFields } from './AddShippingAddressFormTypes'

type AddShippingAddressFormProps = {
	open: boolean
	onClose: () => void
}

const AddShippingAddressForm = ({ open, onClose }: AddShippingAddressFormProps) => {
	const t = useTranslations('containers.profile')

	const { mutate: addShippingAddress } = useAddShippingAddress()
	const { data: customer } = useCustomerProfile()

	const {
		control,
		reset,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<AddShippingAddressFormFields>({
		mode: 'onChange',
		resolver: zodResolver(AddShippingAddressFormSchema),
		defaultValues: {
			address1: '',
			address2: '',
			city: '',
			countryCode: '',
			postalCode: ''
		}
	})

	const handleFormSubmit = (data: AddShippingAddressFormFields) => {
		addShippingAddress(
			{
				address: {
					address_1: data.address1,
					address_2: data.address2,
					city: data.city,
					country_code: data.countryCode,
					postal_code: data.postalCode,
					company: data.company,
					first_name: customer?.first_name ?? '',
					last_name: customer?.last_name ?? '',
					phone: customer?.phone ?? '',
					province: '',
					metadata: {}
				}
			},
			{
				onSuccess: () => {
					reset()
					onClose()
				}
			}
		)
	}

	return (
		<Modal open={open} onCancel={onClose} footer={null}>
			<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
				<HookFormField
					label={t('address1')}
					placeholder={t('enterAddress1')}
					component={InputField}
					control={control}
					name='address1'
					size='large'
					required
				/>
				<HookFormField label={t('address2')} placeholder={t('enterAddress2')} component={InputField} control={control} name='address2' size='large' />
				<HookFormField label={t('city')} placeholder={t('enterCity')} component={InputField} control={control} name='city' size='large' />
				<HookFormField
					label={t('countryCode')}
					placeholder={t('enterCountryCode')}
					component={InputField}
					control={control}
					name='countryCode'
					size='large'
				/>
				<HookFormField
					label={t('postalCode')}
					placeholder={t('enterPostalCode')}
					component={InputField}
					control={control}
					name='postalCode'
					size='large'
				/>
				<HookFormField label={t('company')} placeholder={t('enterCompany')} component={InputField} control={control} name='company' size='large' />
				<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
					{t('submitButton')}
				</Button>
			</SC.Form>
		</Modal>
	)
}

export default AddShippingAddressForm
