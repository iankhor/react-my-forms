import React, { useState, ChangeEvent } from 'react'
import './App.css'

function isFieldError(value: string | null): boolean {
	return value === ''
}

export default function App() {
	const [password, setPassword] = useState<string | null>(null)

	return (
		<div className="App">
			<form>
				<label>
					Password
					<input
						value={password || ''}
						required
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value.trim())
						}}
						onBlur={(e: ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value.trim())
						}}
					/>
				</label>
				<div role="alert" style={{ display: isFieldError(password) ? '' : 'none' }}>
					Error
				</div>

				<label>
					Confirm password
					<input value="" onChange={() => {}} />
				</label>
			</form>
		</div>
	)
}
