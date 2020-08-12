import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('password validation', () => {
	describe('on blank form', () => {
		beforeEach(() => {
			render(<App />)
		})

		it('has a password field', () => {
			const passwordField = screen.getByRole('textbox', { name: 'Password' })

			expect(passwordField).toHaveValue('')
		})

		it('has a password confirmation field', () => {
			const confirmPasswordField = screen.getByRole('textbox', { name: 'Confirm password' })

			expect(confirmPasswordField).toHaveValue('')
		})
	})

	describe('populating password field', () => {
		describe('with values', () => {
			it('fills password field', () => {
				render(<App />)

				const passwordField = screen.getByRole('textbox', { name: 'Password' })
				expect(screen.getByText('Error')).not.toBeVisible()
				userEvent.type(passwordField, 'password!123')

				expect(passwordField).toBeRequired()
				expect(passwordField).toBeValid()
				expect(passwordField).toHaveValue('password!123')
				expect(screen.getByText('Error')).not.toBeVisible()
			})

			describe('with values less than 5 characters', () => {
				it('fills password field', () => {
					render(<App />)

					const passwordField = screen.getByRole('textbox', { name: 'Password' })
					expect(screen.getByText('Error')).not.toBeVisible()
					userEvent.type(passwordField, '123')
					fireEvent.blur(passwordField)

					expect(screen.getByText('Error')).toBeVisible()
				})
			})
		})

		describe('without values', () => {
			it('shows required error', () => {
				render(<App />)

				const passwordField = screen.getByRole('textbox', { name: 'Password' })
				expect(screen.getByText('Error')).not.toBeVisible()
				userEvent.type(passwordField, ' ')
				fireEvent.blur(passwordField)

				expect(passwordField).toBeRequired()
				expect(passwordField).toBeInvalid()
				expect(passwordField).toHaveValue('')
				expect(screen.getByText('Error')).toBeVisible()
			})
		})
	})
})
