import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import HookFormField from '@/components/HookFormField'
import { useStore } from '@/providers/StoreProvider'
import { PersonalInformationFormSchema } from '@/schemas/personalInformationSchemas'
import { zodResolver } from '@/utils/zodResolver'

import * as SC from './PersonalInformationFormStyles'
import { PersonalInformationFormFields } from './PersonalInformationFormTypes'

type PersonalInformationProps = {
	onSubmitted: () => void
}

const PersonalInformationForm = ({ onSubmitted }: PersonalInformationProps) => {
	const t = useTranslations('containers.checkout')

	const { updateShippingAddress, updateCheckoutEmail } = useStore()

	const {
		control,
		formState: { isSubmitting },
		handleSubmit
	} = useForm<PersonalInformationFormFields>({
		mode: 'onChange',
		resolver: zodResolver(PersonalInformationFormSchema),
		defaultValues: { firstName: '', lastName: '', email: '', phone: '' }
	})

	const handleFormSubmit = (data: PersonalInformationFormFields) => {
		console.log('submit')
		updateShippingAddress(
			{
				first_name: data.firstName,
				last_name: data.lastName,
				phone: data.phone
			},
			{
				onSuccess: () => {
					updateCheckoutEmail(data.email)
					onSubmitted()
				}
			}
		)
	}

	return (
		<SC.Form onSubmitCapture={handleSubmit(handleFormSubmit)}>
			<HookFormField
				label={t('name')}
				placeholder={t('firstNamePlaceholder')}
				component={InputField}
				control={control}
				name='firstName'
				size='large'
				required
			/>
			<HookFormField
				label={t('surname')}
				placeholder={t('lastNamePlaceholder')}
				component={InputField}
				control={control}
				name='lastName'
				size='large'
				required
			/>
			<HookFormField label={t('email')} placeholder={t('emailPlaceholder')} component={InputField} control={control} name='email' size='large' required />
			<HookFormField label={t('phone')} placeholder={t('phonePlaceholder')} component={InputField} control={control} name='phone' size='large' required />
			<Button type='primary' size='large' htmlType='submit' block disabled={isSubmitting} loading={isSubmitting}>
				{t('submitButton')}
			</Button>
		</SC.Form>
	)
}

export default PersonalInformationForm
