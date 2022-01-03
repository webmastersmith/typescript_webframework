import { User } from './models/User'

const user = new User({ name: 'bryon', age: 46 })

console.log(user.get('name'))
console.log(user.get('age'))
user.set('name', 'bob')
user.set('age', 20)
console.log(user.get('name'))
console.log(user.get('age'))
