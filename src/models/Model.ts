import { Callback } from './Eventing'
import { AxiosResponse, AxiosPromise } from 'axios'

interface ModelAttributes<T> {
  set(update: T): void
  getAll(): T
  get<K extends keyof T>(propName: K): T[K]
}
interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}
interface Events {
  on(eventName: string, callback: Callback): void
  trigger(eventName: string): void
}
interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
  get get() {
    return this.attributes.get
  }

  // these have dual needs
  set = (update: T): void => {
    this.attributes.set(update)
    this.events.trigger('change')
  }
  fetch = (): void => {
    const id = this.get('id')
    if (typeof id !== 'number')
      throw new Error('Cannot fetch user without proper id.')

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data)
    })
  }
  save = (): void => {
    const data = this.attributes.getAll()
    this.sync
      .save(data)
      .then((res: AxiosResponse): void => {
        this.trigger('save')
      })
      .catch((error) => {
        this.trigger('error')
        console.log(error)
      })
  }
}
