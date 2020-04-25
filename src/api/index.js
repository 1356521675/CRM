const commonUrl= process.env.NODE_ENV == 'development' ? process.env.VUE_APP_URL : process.env.VUE_APP_MSG;
const api = {
  baseUrl: commonUrl+'/',
  abaseUrl: commonUrl+'/api/v1',
  basePart: '/api/v1'
}
export default api