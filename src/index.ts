import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.create({ name: 'rudolf', age: 2003 })

const userForm = new UserForm(document.getElementById('root'), user)
userForm.render()
