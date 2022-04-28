export default function(instance) {
    return {
        add_money(payload) {
            const load = localStorage.getItem('user')
            return instance.post('api/put-money', payload,{headers:  { 'Authorization':load}})
        }
    }
}