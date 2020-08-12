import React, { ChangeEvent, useReducer } from 'react'
import './App.css'

type FormState = {
	password: string | null
	errors: {
		password: boolean | null
	}
}

type Action =
	| {
			type: 'change'
			property: keyof FormState
			value: any
	  }
	| {
			type: 'blur'
			property: keyof FormState
			value: any
	  }

const initFormState = {
	password: null,
	errors: {
		password: false,
	},
}

function reducer(state: FormState, action: Action) {
	switch (action.type) {
		case 'change':
			return { ...state, [action.property]: action.value.trim() }
		case 'blur': {
			const newState = { ...state, [action.property]: action.value.trim() }
			return {
				...newState,
				errors: { ...validateFields(newState) },
			}
		}
	}
}

function isBlank(value: string | null): boolean {
	return value === ''
}

function isLength(value: string | null, length: number): boolean {
	return typeof value === 'string' && value.length < length
}

function validateFields(state: FormState): any {
	return {
		password: isBlank(state.password) || isLength(state.password, 5),
	}
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
							dispatch({ type: 'change', property: 'password', value: e.target.value })
						}}
						onBlur={(e: ChangeEvent<HTMLInputElement>) => {
							dispatch({ type: 'blur', property: 'password', value: e.target.value })
						}}
					/>
				</label>
				<div role="alert" style={{ display: state.errors.password ? '' : 'none' }}>
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
