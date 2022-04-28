export default function(instance) {
    return {
        create_order(payload) {
            const load = localStorage.getItem('user')
            return instance.post('api/client/create-order', payload, {headers:
                    { 'Authorization':load}})
        }
    }
}