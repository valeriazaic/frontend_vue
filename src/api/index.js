import instance from './instance'

import authModule from './auth'
import auth2factorModule from './auth2fa'
import regModule from './reg'
import GetMoney from './get-money'
import CreateOrder from "@/api/client/create-order";
import AllOrders from "@/api/client/all-orders";
import PutMoney from "@/api/put-money";

export default {
  reg: regModule(instance),
  auth: authModule(instance),
  auth2fa: auth2factorModule(instance),
  get_money: GetMoney(instance),
  create_order: CreateOrder(instance),
  all_orders: AllOrders(instance),
  put_money: PutMoney(instance)
}

