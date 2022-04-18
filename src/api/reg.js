export default function(instance) {
    return {
        signUp(payload) {
            return instance.post('api/registration', payload)
        }
    }
}