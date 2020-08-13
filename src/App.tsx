import React, { useMemo, useState, ChangeEvent, useReducer } from 'react'
import './App.css'

type Form = {
  password: string | null
}

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
  | {
      type: 'submit_errors'
      errors: any
    }

const initFormState = {
  password: null,
  errors: {
    password: [],
  },
}

function reducer(state: FormState, action: Action) {
  switch (action.type) {
    case 'change':
      return { ...state, [action.property]: action.value.trim() }
    case 'blur': {
      const newState = { ...state, [action.property]: action.value.trim() }
      return { ...newState, errors: { ...validateFields(newState) } }
    }
    case 'submit_errors': {
      return {
        ...state,
        errors: { ...action.errors },
      }
    }
  }
}

type ErrorKeys = 'blank' | 'length'

const generateError = () => {
  const errors = ['invalid', 'someErrorKey', '']
  return [errors[Math.floor(Math.random() * errors.length)]].filter(Boolean)
}

function isBlank(value: string | null): ErrorKeys {
  return (value === '' || value === null ? 'blank' : '') as ErrorKeys
}

function isLength(value: string | null, length: number): ErrorKeys {
  return ((typeof value === 'string' && value.length < length) || value === null ? 'length' : '') as ErrorKeys
}

function validateFields(state: FormState): any {
  return {
    password: [isBlank(state.password), isLength(state.password, 5)].filter(Boolean),
  }
}

function errorMessage(key: ErrorKeys) {
  const errorMessage = {
    blank: 'CLIENT VALIDATION cannot be blank',
    length: 'CLIENT VALIDATION is too short',
    invalid: 'SERVER VALIDATION this is invalid',
    someErrorKey: 'SERVERVALIDATION this is some error key message',
    default: 'CLIENT VALIDATION DEFAULT field has errors',
  }

  return errorMessage[key] || errorMessage.default
}

function isValid(state: FormState): any {
  const validatedForm = validateFields(state)
  return Object.values(validatedForm).flat().length === 0
}

const useSimulatedSubmitServer = () => {
  const [isReturnResponse, setIsReturnResponse] = useState<boolean>(false)
  const error = useMemo(() => generateError(), [])

  const response = isReturnResponse ? { password: error } : null

  console.log('sent server error:', response)

  const reset = () => setIsReturnResponse(false)

  const submitForm = (form: Form) => setIsReturnResponse(true)

  return { submitForm, reset, response: isReturnResponse ? { password: error } : null }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initFormState)
  const { submitForm, response, reset } = useSimulatedSubmitServer()

  if (!!response) {
    dispatch({ type: 'submit_errors', errors: response })
    reset()
  }

  const submit = () => {
    const { password } = state
    console.log('submitting form')
    isValid(state) && submitForm({ password })
  }

  return (
    <div className="App">
      <label>
        Password
        <input
          value={state.password || ''}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'change', property: 'password', value: e.target.value })
          }}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            reset()
            dispatch({ type: 'blur', property: 'password', value: e.target.value })
          }}
        />
      </label>
      <div role="alert" style={{ display: state.errors.password.length || response?.password.length ? '' : 'none' }}>
        {errorMessage(state.errors.password[0] || response?.password[0])}
      </div>

      <p>
        <button disabled={!isValid(state)} onClick={submit}>
          Submit
        </button>
      </p>

      <p>
        <button onClick={() => reset()}>Reset</button>
      </p>
      <hr />
      {<pre>Form errors: {JSON.stringify(state.errors)}</pre>}
    </div>
  )
}
