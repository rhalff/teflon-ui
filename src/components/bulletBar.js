export default {
  type: 'Teflon', // default definition format
  title: 'Basic Example with Click Counter',
  tag: 'Counter',
  template: `
  <ul>
    <li>
    <a href="#/flow/0165d79e-bbfc-4b25-bd4c-5c38d4fcc26f" title="New Flow">1</a>
    </li>
  </ul>`,
  mapping: {
    'button': ':0:0',
    'label': ':0:0:0',
    'link': ':0:0:0@href',
    'title': ':0:0:0@title'
  },
  states: {
    'default': {
      events: [
      /**
       *
       * I still dislike the format, but it does not have to be a final format.
       * This can be the low level format.
       *
       * I also do not like how the event name 'increase' is not specified further.
       * It's just a string, I would like it to be described.
       */
        { path: 'button', op: 'add', name: 'click', val: 'showFlow' },
        { path: 'button', op: 'add', name: 'click', val: 'setActive' }
      ]
    },
    active: {
      attributes: [
        // { path: 'button', op: 'add', name: 'class', val: 'active' }
        // omit path so we can specify it ourselfs
        // do keep track of that state though
        { op: 'add', name: 'class', val: 'active' }
      ]
    }
  },
  properties: {
    'bullets': {
      title: 'A bullet',
      path: 'button',
      type: 'array',
      'default': [
        { anchor: '#/flow/1', label: '1', title: 'Flow 1'},
        { anchor: '#/flow/2', label: '2', title: 'Flow 2'},
        { anchor: '#/flow/3', label: '3', title: 'Flow 3'},
        { anchor: '#/flow/4', label: '4', title: 'Flow 4'}
      ],
      items: {
        type: 'object',
        properties: {
          anchor: {
            title: 'Anchor',
            description: 'Link value',
            path: ':0@href',
            type: 'string',
            format: 'url',
            'default': '#/flow/0'
          },
          'label': {
            title: 'Label',
            description: 'Label',
            path: ':0',
            type: 'number',
            'default': 0
            // items: ... continue like data was intended to below. (fixed)
          },
          'title': {
            title: 'Title',
            path: ':0@title',
            type: 'string',
            'default': 'Flow 0'
          }
        }
      }
    }
  },
  /**
   *
   *  Default handlers
   *  Handlers defined within the component itself
   *  Will update the internal state.
   *
   *  Which means what you return will be the new data input.
   *
   *  Internally it does the same as:
   *
   *  teflon.on('<eventname', () => {})
   *
   *  Instead of going external, it feeds itself internally
   */
  handlers: {
    ui: {
      'setActive': function (ev, state, src) {
        const dang = `button[${src.dataset.teflonIndex || 0}]`
        this.toggleState('active', this.dp.resolve(dang), true) // this.dp.getRef(path))
      },
      'showFlow': function (ev, state, src) {
        // not sure yet, should UI only be about state changes?
        return {
        }
      }
    }
    /*
    data: {
      'increase': (ev, state) => {
        return {
          count: ++state.count,
          anchor: '#/flow/' + state.count,
          title: 'Flow ' + state.count
        }
      }
    }
    */
  }
}
