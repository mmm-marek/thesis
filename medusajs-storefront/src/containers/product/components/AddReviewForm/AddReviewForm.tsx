import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SliderProps } from 'react-aria-components'
import { useForm } from 'react-hook-form'

import Button from '@/atoms/Button/Button'
import InputField from '@/atoms/InputField/InputField'
import TextAreaField from '@/atoms/TextAreaField/TextAreaField'
import HookFormField from '@/components/HookFormField'
import useCustomerProfile from '@/hooks/customer/useCustomerProfile'
import usePostProductReview from '@/hooks/products/usePostProductReview'
import { AddReviewFormFields, useAddReviewFormSchema } from '@/schemas/addReviewFormSchema'
import { QUERY_KEYS } from '@/utils/enums'

import * as SC from './AddReviewFormStyles'

type AddReviewFormProps = {
	productID: string
}

type RateSliderProps = {
	value: SliderProps['value']
	onChange: SliderProps['onChange']
}

const RateSlider = ({ value, onChange }: RateSliderProps) => {
	const t = useTranslations('containers.products')

	return (
		<SC.Slider value={value} onChange={onChange} maxValue={5} step={1}>
			<SC.Label>{t('ratingLabel')}</SC.Label>
			<SC.SliderOutput />
			<SC.SliderTrack>
				<SC.SliderThumb />
			</SC.SliderTrack>
		</SC.Slider>
	)
}

const AddReviewForm = ({ productID }: AddReviewFormProps) => {
	const queryClient = useQueryClient()
	const schema = useAddReviewFormSchema()
	const t = useTranslations('containers.products')

	const [rating, setRating] = useState(5)
	const [isFormOpen, setIsFormOpen] = useState(false)

	const { data: profile } = useCustomerProfile()
	const { mutate: postReview, isLoading: isLoadingPostProductReview } = usePostProductReview(productID)

	const { control, handleSubmit, reset } = useForm<AddReviewFormFields>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			content: ''
		}
	})

	const onSubmit = (data: AddReviewFormFields) => {
		postReview(
			{
				...data,
				rating,
				user_name: `${profile?.first_name} ${profile?.last_name}`
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.API_GET_PRODUCT_REVIEWS] })
					reset()
					setRating(5)
					setIsFormOpen(false)
				}
			}
		)
	}

	return isFormOpen ? (
		<SC.FormWrapper onSubmit={handleSubmit(onSubmit)}>
			<SC.Title>{t('addReview')}</SC.Title>
			<RateSlider value={rating} onChange={(value) => typeof value === 'number' && setRating(value)} />
			<SC.FieldsWrapper>
				<HookFormField label={t('title')} placeholder={t('enterTitle')} component={InputField} control={control} name='title' />
				<HookFormField label={t('review')} placeholder={t('enterReview')} component={TextAreaField} control={control} name='content' rows={5} />
			</SC.FieldsWrapper>
			<SC.ButtonsWrapper>
				<Button type='button' isDisabled={isLoadingPostProductReview} size='large' onPress={() => setIsFormOpen(false)}>
					{t('cancel')}
				</Button>
				<Button variant='primary' isDisabled={isLoadingPostProductReview} type='submit' size='large'>
					{t('submit')}
				</Button>
			</SC.ButtonsWrapper>
		</SC.FormWrapper>
	) : (
		<Button variant='primary' type='submit' size='large' onPress={() => setIsFormOpen(true)}>
			{t('addReview')}
		</Button>
	)
}

export default AddReviewForm
