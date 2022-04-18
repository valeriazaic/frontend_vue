import instance from './instance'

import authModule from './auth'
import regModule from './reg'
import filmsModule from './films'

export default {
  reg: regModule(instance),
  auth: authModule(instance),
  films: filmsModule(instance)
}
