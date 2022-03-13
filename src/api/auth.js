export default function(instance) {
  return {
    signIn(payload) {
      return instance.post('api/auth', payload)
    },
    signUp(payload) {
      return instance.post('api/registration', payload)
    },
    logout() {
      return instance.delete('auth/logout')
    }
  }
}