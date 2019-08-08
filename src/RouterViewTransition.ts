import { FunctionalComponentOptions } from 'vue'
import { scrollWaiter } from './scrollWaiter'

const events = {
  '': {},
  'out-in': {
    beforeEnter: () => scrollWaiter.flush(),
    beforeLeave: () => scrollWaiter.add(),
  },
  'in-out': {},
}

type ModeType = keyof typeof events

interface RouterViewTransitionComponentProps {
  transition?: string
  view?: string
  name?: string
}

const RouterViewTransition: FunctionalComponentOptions<
  RouterViewTransitionComponentProps
> = {
  functional: true,
  props: {
    transition: String,
    view: String,
    name: {
      type: String,
      default: 'default',
    },
  },

  render: (h, { data, props }) => {
    // TODO: merge on events passed from data that can be added to transition
    const { attrs } = data
    delete data.attrs
    const mode: ModeType = attrs ? attrs.mode : ''

    return h(
      'transition',
      {
        props: {
          name: props.transition,
        },
        on: events[mode],
        attrs,
      },
      [h('router-view', data)]
    )
  },
}

export default RouterViewTransition
