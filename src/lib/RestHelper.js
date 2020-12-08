/* globals fetch, Headers, FormData */

export const request = (url, token, method, body) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', token)

  const params = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
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
