import axios, { AxiosPromise } from 'axios'

interface HasId {
  id?: number
}
export class ApiSync<T extends HasId> {
  constructor(public url: string) {}
  // url: string = 'http://localhost:3000/users'

  fetch = (id: number): AxiosPromise => {
    return axios.get(`${this.url}/${id}`)
  }

  save = (data: T): AxiosPromise => {
    const id = data?.id
    // if user id exist, just update user
    return id
      ? axios.put(`${this.url}/${id}`, data)
      : axios.post(this.url, data)
  }
}
