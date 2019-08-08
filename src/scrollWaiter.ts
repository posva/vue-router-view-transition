interface ScrollWaiter {
  resolve: (() => void) | null
  promise: Promise<void> | null

  add: () => void
  flush: () => void
  wait: () => Promise<void>
}

export const scrollWaiter: ScrollWaiter = {
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
