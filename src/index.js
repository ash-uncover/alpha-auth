import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {
  Provider
} from 'react-redux'

import store from 'store'

import Root from 'components/Root'

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import {
  setContext
} from '@apollo/client/link/context'

import './index.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:8090/graphql'
})
const authLink = setContext((_, { headers }) => {
  const token = store.getState()?.auth?.logonData?.token
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token
      }
    }
  }
  return headers
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router hashType='noslash'>
        <Root />
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('react-root')
)
