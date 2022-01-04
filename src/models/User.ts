import { Eventing } from './Eventing'
import { Sync } from './Sync'
import { Attributes } from './Attributes'
import { AxiosResponse } from 'axios'

export interface UserProps {
  name?: string
  age?: number
  id?: number
}

export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(
    'http://localhost:3000/users'
  )
  public attributes: Attributes<UserProps>

  constructor(public attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

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
  set(update: UserProps): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }
  fetch(): void {
    const id = this.get('id')
    if (typeof id !== 'number')
      throw new Error('Cannot fetch user without proper id.')

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data)
    })
  }
  save(): void {
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
