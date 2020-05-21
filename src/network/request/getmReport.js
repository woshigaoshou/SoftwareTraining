import { request3 } from "./request"

export function getmReport() {
  return request3({
    url: "/project/select/" + localStorage.getItem('USERID')
  })
}
