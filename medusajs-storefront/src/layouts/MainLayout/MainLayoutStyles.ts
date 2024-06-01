import Link from 'next/link'
import styled, { css } from 'styled-components'

import { textXsRegular } from '@/styles/helpers'

export const ActionsWrapper = styled.div`
	${({ theme }) => css`
		background: ${theme.tokens['color-base-content-top']};
		width: 100%;
	`};
`

export const Actions = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: end;
	padding: 8px 0;
`

export const ActionLink = styled(Link)`
	${({ theme }) => css`
		${textXsRegular};
		color: ${theme.tokens['color-inverse-content-primary']};

		&:hover {
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

export const ActionButton = styled.button`
	${({ theme }) => css`
		border: none;
		background: none;
		cursor: pointer;
		color: ${theme.tokens['color-inverse-content-primary']};
		${textXsRegular};

		&:hover {
			color: ${theme.tokens['color-inverse-content-secondary']};
		}
	`};
`

export const ActionDivider = styled.div`
	background: ${({ theme }) => theme.tokens['color-inverse-content-quaternary']};
	width: 1px;
	height: 18px;
`

export const CappedContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1180px;
`

export const Header = styled.header`
	${({ theme }) => css`
		border-bottom: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-surface-primary']};
	`};
`

export const Content = styled.main`
	${({ theme }) => css`
		background: ${theme.tokens['color-base-surface-primary']};
		padding: 24px 50px;
	`};
`

export const Footer = styled.footer`
	${({ theme }) => css`
		border-top: 1px solid ${theme.tokens['color-base-surface-tertiary']};
		background: ${theme.tokens['color-base-surface-primary']};
	`};
`

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 4px;
	height: 64px;
`

export const LinksWrapper = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	justify-content: end;
	width: 180px;
`

export const LogoLink = styled(Link)`
	${({ theme }) => css`
		svg {
			color: ${theme.tokens['color-base-content-top']};
		}
	`};
`
