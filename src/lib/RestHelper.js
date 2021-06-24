/* globals fetch, Headers, FormData */

export const getResponseBody = async (response) => {
  try {
    const result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

export const request = async (url, token, method, body) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  if (token) {
    headers.append('Authorization', token)
  }

  const params = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  }

  try {
    const response = await fetch(url, params)
    if (response.ok) {
      const result = await getResponseBody(response)
      return result
    } else {
      const error = await getResponseBody(response)
      throw new Error(error.error)
    }
  } catch (error) {
    if (error.message) {
      throw error
    }
    throw new Error(error)
  }
}

export const get = (url, token) => {
  return request(url, token, 'GET')
}

export const post = (url, token, body) => {
  return request(url, token, 'POST', body)
}

export const put = (url, token, body) => {
  return request(url, token, 'PUT', body)
}

export const patch = (url, token, body) => {
  return request(url, token, 'PATCH', body)
}

export const del = (url, token) => {
  return request(url, token, 'DELETE')
}

export const postImage = (url, token, file) => {
  const headers = new Headers()
  headers.append('Authorization', token)

  const body = new FormData()
  body.append('file', file)

  const params = {
    method: 'POST',
    headers,
    body
  }

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return null
      }
      throw new Error(response)
    })
}
