import React, { ChangeEvent, useReducer } from 'react'
import './App.css'

type FormState = {
  password: string | null
  errors: {
    password: ErrorKeys[]
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

type ErrorKeys = 'blank' | 'length'

function isBlank(value: string | null): ErrorKeys {
  return (value === '' ? 'blank' : '') as ErrorKeys
}

function isLength(value: string | null, length: number): ErrorKeys {
  return (typeof value === 'string' && value.length < length ? 'length' : '') as ErrorKeys
}

function validateFields(state: FormState): any {
  return {
    password: [isBlank(state.password), isLength(state.password, 5)].filter(Boolean),
  }
}

function errorMessage(key: ErrorKeys) {
  const errorMessage = {
    blank: 'cannot be blank',
    length: 'is too short',
    default: 'field has errors',
  }

  return errorMessage[key] || errorMessage.default
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
        <div role="alert" style={{ display: state.errors.password.length ? '' : 'none' }}>
          {errorMessage(state.errors.password[0])}
        </div>

        <label>
          Confirm password
          <input value="" onChange={() => {}} />
        </label>
      </form>
    </div>
  )
}
