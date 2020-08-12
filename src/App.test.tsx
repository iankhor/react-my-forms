import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('password validation', () => {
	describe('on blank form', () => {
		beforeEach(() => {
			render(<App />)
		})

		it('has a password field', () => {
			const passwordField = screen.getByLabelText('Password')

			expect(passwordField).toHaveValue('')
		})

		it('has a password confirmation field', () => {
			const confirmPasswordField = screen.getByLabelText('Confirm password')

			expect(confirmPasswordField).toHaveValue('')
		})
	})
})
