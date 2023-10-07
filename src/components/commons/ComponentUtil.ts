
function transform(arg: string | string[]): string[] {
  if (Array.isArray(arg)) {
    return arg.reduce((acc, s) => {
      acc.push(...transform(s))
      return acc
    }, [])
  }
  return (arg || '').split(' ').filter(s => s)
}

export class ClassBuilder {

  // Attributes //

  #classArray: { [key: string]: boolean } = {}

  // Constructor //

  constructor(classBase: string | string[]) {
    transform(classBase).forEach(c => {
      this.#classArray[c] = true
    })
  }

  // Getters & Setters //

  get className() {
    return Object.keys(this.#classArray).join(' ')
  }

  // Methods //

  add(className: string | string[]) {
    transform(className).forEach(c => {
      this.#classArray[c] = true
    })
  }
  remove(className: string | string[]) {
    transform(className).forEach(c => {
      delete this.#classArray[c]
    })
  }
  toggle(className: string | string[]) {
    transform(className).forEach(c => {
      if (this.#classArray[c]) {
        this.remove(c)
      } else {
        this.add(c)
      }
    })
  }
}