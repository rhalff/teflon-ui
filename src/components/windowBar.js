export default {
  type: 'Teflon', // default definition format
  title: 'Window Bar',
  tag: 'WindowBar',
  template: `
     <div class="windowBar">
        <button type="button"
                data-toggle="tooltip"
                title="Window"
                class="btn btn-default btn-xs navbar-btn">
            Window
        </button>
    </div>`,
  mapping: {
    'button': ':0:0'
  },
  states: {
    'default': {
      events: [
        { path: 'button', op: 'add', name: 'click', val: 'showFlow' },
        { path: 'button', op: 'add', name: 'click', val: 'setActive' }
      ]
    },
    active: {
      attributes: [
        { op: 'add', name: 'class', val: 'active' }
      ]
    }
  },
  properties: {
    // this is kinda exact.
    // I still like how different entries can be used.
    // to fill data differently.
    'bullets': {
      title: 'A bullet',
      path: 'button',
      type: 'array',
      'default': [
        { label: 'DebugWindow', title: 'DebugWindow'},
        { label: 'ConnectorWindow', title: 'ConnectorWindow'},
        { label: 'LogWindow', title: 'LogWindow'},
        { label: 'PortsWindow', title: 'PortsWindow'},
        { label: 'PreviewWindow', title: 'PreviewWindow'}
      ],
      items: {
        type: "object",
        properties: {
          'label': {
            title: 'Label',
            description: 'Label',
            path: ':0',
            type: 'number',
            'default': 0
          },
          /* @title (direct) is not understood
          'title': {
            title: 'Title',
            path: '@title',
            type: 'string',
            'default': 'Flow 0'
          }
          */
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
    /**
     *
     * Ok and then you come to the point where they should be applied
     * both first and then render.
     *
     */
    ui: {
      'setActive': function(ev, state, src) {
        const dang = `button[${src.dataset.teflonIndex || 0 }]`
        this.toggleState('active', this.dp.resolve(dang), true) // this.dp.getRef(path))
      },
      'showFlow': function(ev, state, src) {
        // not sure yet, should UI only be about state changes?
        return {
        }
      }
    },
    data: {

    }
  }
}