# vue-router-view-transition [![Build Status](https://badgen.net/circleci/github/posva/vue-router-view-transition)](https://circleci.com/gh/posva/vue-router-view-transition) [![npm package](https://badgen.net/npm/v/vue-router-view-transition)](https://www.npmjs.com/package/vue-router-view-transition) [![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/posva/thanks)

> A transition wrapper for router-view that is compatible with scrollBehavior

## Installation

```sh
npm install vue-router-view-transition
# or
yarn add vue-router-view-transition
```

## Usage

This library exports one component and one function. You need to use both:

First, you can either globally install the component `RouterViewTransition`:

```js
import { RouterViewTransition } from 'vue-router-view-transition'

Vue.component('RouterViewTransition', RouterViewTransition)
```

or import it locally in any Vue component:

```js
import { RouterViewTransition } from 'vue-router-view-transition'

export default {
  components: { RouterViewTransition },
}
```

Then you should replace your `router-view` with this `router-view-transition`:

```vue
<router-view-transition transition="fade" mode="out-in" />
```

Here the `transition` prop refers to the _name_ of the transition (prop named `name` for the `transition` component) while the `mode` is exactly the same as the prop with the same name in the `transition` component.

Then you must import the `waitForTransition` function and wrap your `scrollBehavior` function:

```js
// probably your router.js file
const router = new Router({
  mode: 'history',
  routes: [
    // your routes
  ],
  scrollBehavior: waitForTransition((to, from, savedPosition) => {
    // this code will get executed only once the transition wrapping router-view is finished
    // this ensures
    if (savedPosition) {
      return savedPosition
    } else {
      // this ensures we go to the top of the page when navigating to a new page
      return { x: 0, y: 0 }
    }
  }),
})
```

**Note**: You may also want to enable _manual_ scroll restoration:

```js
history.scrollRestoration = 'manual'
```

## Related

- Vue Router: https://github.com/vuejs/vue-router

## License

[MIT](http://opensource.org/licenses/MIT)
