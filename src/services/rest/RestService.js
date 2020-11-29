import auth from 'services/rest/AuthService'
import users from 'services/rest/UsersService'
import relations from 'services/rest/RelationsService'

const RestService = {
  api: {
    auth,
    relations,
    users
  }
}

export default RestService
