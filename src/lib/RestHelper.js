/* globals fetch, Headers */

export const request = (url, token, method, body) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', token)

  const params = {
    method,
    headers,
    body
  }

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        if (method === 'DELETE') {
          return null
        }
        return response.json()
      }
      throw new Error(response)
    })
}

export const get = (url, token) => {
  return request(url, token, 'GET')
}

export const post = (url, token, body) => {
  return request(url, token, 'POST', body ? JSON.stringify(body) : null)
}

export const put = (url, token, body) => {
  return request(url, token, 'PUT', body ? JSON.stringify(body) : null)
}

export const patch = (url, token, body) => {
  return request(url, token, 'PATCH', body ? JSON.stringify(body) : null)
}

export const del = (url, token) => {
  return request(url, token, 'DELETE')
}
