export default function(instance) {
    return {
        get_user_money() {
            const load = localStorage.getItem('user')
            return instance.get('api/get-money', {headers:
                    { 'Authorization':load}})
        }
    }
}