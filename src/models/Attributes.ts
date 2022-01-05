export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(propName: K): T[K] => this.data[propName]

  getAll = (): T => {
    return this.data
  }

  set = (update: T): void => {
    this.data = { ...this.data, ...update }
  }
}
