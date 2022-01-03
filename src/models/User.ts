interface UserProps {
  name: string
  age: number
}

export class User {
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName]
  }
  set(propName: string, value: string | number): void {
    this.data[propName] = value
  }
}
