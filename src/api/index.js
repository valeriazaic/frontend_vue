import instance from './instance'

import authModule from './auth'
import auth2factorModule from './auth2fa'
import regModule from './reg'
import filmsModule from './films'
import GetMoney from './get-money'

export default {
  reg: regModule(instance),
  auth: authModule(instance),
  films: filmsModule(instance),
  auth2fa: auth2factorModule(instance),
  get_money: GetMoney(instance)
}

