export default function(instance) {
  return {
    signIn(payload) {
      return instance.post('api/auth', payload)
    },
    logout() {
      return instance.delete('auth/logout')
    }
  }
}