import auth from 'services/rest/AuthService'
import users from 'services/rest/UsersService'

const RestService = {
  api: {
    auth,
    users
  }
}

export default RestService
