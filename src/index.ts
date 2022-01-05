import { UserList } from './views/UserList'
import { Collection } from './models/Collection'
import { User, UserProps } from './models/User'

const rootUrl = 'http://localhost:3000/users'

const users = new Collection(rootUrl, (json: UserProps) => {
  return User.create(json)
})

users.fetch()

users.on('change', () => {
  const root = document.getElementById('root')
  if (root) {
    const userList = new UserList(root, users)
    userList.render()
    console.log(userList)
  } else {
    throw new Error('Root Element not found.')
  }
})
