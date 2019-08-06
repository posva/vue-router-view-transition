export const scrollWaiter = {
  resolve: null,
  promise: null,

  add() {
    this.promise = new Promise(resolve => {
      this.resolve = resolve
    })
  },

  flush() {
    this.resolve && this.resolve()
    this.resolve = null
    this.promise = null
  },

  async wait() {
    await this.promise
  },
}
