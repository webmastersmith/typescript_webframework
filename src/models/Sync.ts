import axios, { AxiosPromise } from 'axios'
import { UserProps } from './User'

interface HasId {
  id?: number
}
export class Sync<T extends HasId> {
  // url: string = 'http://localhost:3000/users'

  constructor(public url: string) {}

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
