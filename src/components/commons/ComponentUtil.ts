

export class ClassBuilder {

  // Attributes //

  #classArray: { [key: string]: boolean } = {}

  // Constructor //

  constructor(classBase: string) {
    (classBase || '').split(' ').filter(s => s).forEach(c => {
      this.#classArray[c] = true
    })
  }

  // Getters & Setters //

  get className() {
    return Object.keys(this.#classArray).join(' ')
  }

  // Methods //

  add(className: string) {
    (className || '').split(' ').filter(s => s).forEach(c => {
      this.#classArray[c] = true
    })
  }
  remove(className: string) {
    (className || '').split(' ').filter(s => s).forEach(c => {
      delete this.#classArray[c]
    })
  }
  toggle(className: string) {
    (className || '').split(' ').filter(s => s).forEach(c => {
      if(this.#classArray[c]) {
        this.remove(c)
      } else {
        this.add(c)
      }
    })
  }
}