import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('password validation', () => {
	describe('on blank form', () => {
		it('has a password field', () => {
			render(<App />)

			const passwordField = screen.getByLabelText('Password')

			expect(passwordField).toHaveValue('')
		})

		it('has a password confirmation field', () => {
			render(<App />)

			const confirmPasswordField = screen.getByLabelText('Confirm password')

			expect(confirmPasswordField).toHaveValue('')
		})
	})
})
