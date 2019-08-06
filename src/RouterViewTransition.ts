import { FunctionalComponentOptions } from 'vue'
import { scrollWaiter } from './scrollWaiter'

const events = {
  '': {},
  'out-in': {
    beforeEnter: () => scrollWaiter.flush(),
    beforeLeave: () => scrollWaiter.add(),
  },
  'in-out': {
    afterLeave: () => scrollWaiter.flush(),
    beforeEnter: () => scrollWaiter.add(),
  },
}

type ModeType = keyof typeof events

interface RouterViewTransitionComponentProps {}

interface RouterViewTransitionComponent
  extends FunctionalComponentOptions<RouterViewTransitionComponentProps> {
  // active: RouterViewTransitionComponentProps['active']
}

const RouterViewTransition: RouterViewTransitionComponent = {
  functional: true,

  render: (h, { data }) => {
    // TODO: merge on events passed from data that can be added to transition
    const { attrs } = data
    delete data.attrs
    const mode: ModeType = attrs ? attrs.mode : ''

    return h(
      'transition',
      {
        on: events[mode],
        attrs,
      },
      [h('router-view', data)]
    )
  },
}

export default RouterViewTransition
