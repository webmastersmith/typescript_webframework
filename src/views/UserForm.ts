import { User } from '../models/User'

export class UserForm {
  constructor(public parent: Element, public model: User) {}

  onSetNameClick = (): void => {
    // console.log('updateName')
    const input = this.parent.querySelector('input')
    if (!input) return
    const name = input.value
    this.model.set({ name })
    this.render()
    console.log(this.model)
  }
  onSaveClick = (): void => {
    console.log('saving')
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge()
    this.model.on('change', () => this.render())
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
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>

        <input type="text" class="name-input" />
        <button class="set-name">Update Name</button>
        <button class="set-age">Set User Age</button>
        </div>
        <button class="save">Save</button>

    `
  }

  bindEvents = (fragments: DocumentFragment): void => {
    const eventsMap = this.eventsMap()
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':')
      fragments.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render = (): void => {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)

    this.parent.append(templateElement.content)
  }
}
