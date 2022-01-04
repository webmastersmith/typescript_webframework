import { User } from './models/User'

const user = new User({ id: 1, name: 'b', age: 0 })

user.on('save', () => console.log(user))
// user.set({name: 'bob', age: 19})

user.save()
