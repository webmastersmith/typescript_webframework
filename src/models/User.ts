import { Model } from './Model'
import { Attributes } from './Attributes'
import { Eventing } from './Eventing'
import { ApiSync } from './ApiSync'
import { Collection } from './Collection'

export interface UserProps {
  name?: string
  age?: number
  id?: number
}
const rootUrl: string = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static create = (attrs: UserProps): User => {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    )
  }

  static buildUserCollection = (): Collection<User, UserProps> => {
    return new Collection<User, UserProps>(rootUrl, User.create)
  }

  setRandomAge = (): void => {
    const age = Math.round(Math.random() * 99) + 1 //1-100
    this.set({ age })
  }
}
