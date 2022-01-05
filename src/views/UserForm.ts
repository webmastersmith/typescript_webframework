import { View } from './View'
import { User, UserProps } from '../models/User'

export class UserForm extends View<User, UserProps> {
  onSetNameClick = (): void => {
    // console.log('updateName')
    const input = this.parent.querySelector('input')
    if (!input) return
    const name = input.value
    this.model.set({ name })
    console.log(this.model)
  }
  onSaveClick = (): void => {
    this.model.save()
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }
  onNameInputChange(): void {}

  eventsMap = (): { [key: string]: () => void } => {
    return {
      //   'mouseenter:h1': this.onHeaderHover,
      'click:.set-name': this.onSetNameClick,
      'click:.set-age': this.onSetAgeClick,
      'click:.save': this.onSaveClick,
    }
  }

  template = (): string => {
    return `
    <div>
        <input type="text" class="name-input" placeholder="${this.model.get(
          'name'
        )}" />
        <button class="set-name">Update Name</button>
        <button class="set-age">Set User Age</button>
        </div>
        <button class="save">Save</button>

    `
  }
}
