import { RouterOptions } from 'vue-router'

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

type ScrollBehaviorMethod = Required<RouterOptions>['scrollBehavior']

/**
 * Wraps a scrollBehavior method to asynchronously await for the entering view to be visible. It requires you to use the `router-view-transition` component
 * @param guard
 */
export function waitForTransition(
  scrollBehavior: ScrollBehaviorMethod
): ScrollBehaviorMethod {
  return async (...args) => {
    await scrollWaiter.wait()
    scrollBehavior(...args)
  }
}
