import React, { ChangeEvent, useReducer } from 'react'
import './App.css'

type FormState = {
	password?: string | null
}

type Action = {
	type: 'change'
	property: keyof FormState
	value: any
}

const initFormState = {
	password: null,
}

function reducer(state: FormState, action: Action) {
	switch (action.type) {
		case 'change':
			return { ...state, [action.property]: action.value }
	}
}

function isFieldError(value: string | null): boolean {
	return value === ''
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initFormState)

	return (
		<div className="App">
			<form>
				<label>
					Password
					<input
						value={state.password || ''}
						required
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							dispatch({ type: 'change', property: 'password', value: e.target.value.trim() })
						}}
						onBlur={(e: ChangeEvent<HTMLInputElement>) => {
							dispatch({ type: 'change', property: 'password', value: e.target.value.trim() })
						}}
					/>
				</label>
				<div role="alert" style={{ display: isFieldError(state.password) ? '' : 'none' }}>
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
