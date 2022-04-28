export default function(instance) {
    return {
        signIn2factor(payload) {
            const load = localStorage.getItem('user_first_jwt')
            return instance.post('api/auth2fa', payload, {headers:
                    { 'Authorization':load}})
        }
    }
}