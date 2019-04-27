import http from './http'

let domain = http.domain.mvc

export function menu(obj ={}) {
  return http.post(`${domain}/login/login.json`, obj)
}
