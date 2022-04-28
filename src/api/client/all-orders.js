export default function(instance) {
    return {
        get_orders() {
            const load = localStorage.getItem('user')
            console.log(load)
            return instance.get('api/client/all-orders', {headers:{ 'Authorization':load}})
        }
    }

}