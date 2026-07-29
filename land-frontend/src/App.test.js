import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import rootReducer from './redux/rootReducer'

test('renders the Acreak sign-in screen for a signed-out user', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ data: [] })
  }))

  const store = createStore(rootReducer, applyMiddleware(thunk))

  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  )

  expect(screen.getByText(/sign in to acreak/i)).toBeInTheDocument()
})
