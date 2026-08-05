export const useApi = () => {
  const productionUrl = 'https://yolaab.com/api'
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return { apiUrl: 'http://localhost:3000/api' }
    }
  }
  return { apiUrl: productionUrl }
}
