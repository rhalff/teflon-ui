export default {
  type: 'Teflon', // default definition format
  title: 'Icon Bar',
  tag: 'IconBar',
  // this is interesting because the last class needs a custom class per item
  // this must be possible, in a way that's dynamic state definition.
  // so just like path is dynamic in this case the value of the class to be added will be computed
  // maybe val: (val) => 'glyphicon-${id}'
  // which seems nice, again this will be a lot like angular filter.
  // anyway much will be refactored along the way.
  // I want to recreate this whole app and then support it in the best and most clear way possible.
  // make it as clear as possible and as compact as possible, while still support all needed functionality
  // The idea was I do not compute after, I feed it as data before.
  // so if the class needs to be glyphicon-remove, I should already feed this data as glyphicon-remove and name it.
  // so iconClass for instance data.iconClass = 'glyphicon-remove, where iconClass itself is computed.
  // iconClass then also has to be defined first. which means creating iconClass is outside of the scope of teflon
  // The UI must facilitate this
  // also not *our* data is view data, not a one on one model data.
  // toViewData() fromViewData() UI methods (not teflon or dompointer)
  // where above is just a reversal.
  template: `
  <ul id='iconBar' class='navbar-text navbar'>
    <li id='icon' data-toggle='tooltip' title='Icon Title' class=''></li>
  </ul>

  `,
  mapping: {
    'button': ':0:0'
  },
  states: {
    'default': {
      events: [
        { path: 'icon-close', op: 'add', name: 'click', val: 'CLOSE'},
        { path: 'icon-new', op: 'add', name: 'click', val: 'NEW'},
        { path: 'icon-save', op: 'add', name: 'click', val: 'SAVE'},
        { path: 'icon-refresh', op: 'add', name: 'click', val: 'REFRESH'},
        { path: 'icon-play', op: 'add', name: 'click', val: 'PLAY'},
        { path: 'icon-pause', op: 'add', name: 'click', val: 'PAUSE'},
        { path: 'icon-step', op: 'add', name: 'click', val: 'STEP'},
        { path: 'icon-stop', op: 'add', name: 'click', val: 'STOP'},
        { path: 'icon-zoom-in', op: 'add', name: 'click', val: 'ZOOM-IN'},
        { path: 'icon-zoom-out', op: 'add', name: 'click', val: 'ZOOM-OUT'},
        { path: 'icon-trash', op: 'add', name: 'click', val: 'DELETE'}
      ]
    },
    'play': {
      attributes: [
        { path: 'icon-play', op: 'add', name: 'class', val: 'active'}
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
        // iconClass is not how it should be, rethink that later
        { id: 'icon-close', title: 'Remove', iconClass: 'glyphicon glyphicon-remove' },
        { id: 'icon-new', title: 'new', iconClass: 'glyphicon glyphicon-new-window' },
        { id: 'icon-save', title: 'Save', iconClass: 'glyphicon glyphicon-save' },
        { id: 'icon-refresh', title: 'Refresh', iconClass: 'glyphicon glyphicon-refresh' },
        { id: 'icon-play', title: 'Run', iconClass: 'glyphicon glyphicon-play' },
        { id: 'icon-pause', title: 'Pause', iconClass: 'glyphicon glyphicon-pause' },
        { id: 'icon-step', title: 'Step by step', iconClass: 'glyphicon glyphicon-step-forward' },
        { id: 'icon-stop', title: 'Stop', iconClass: 'glyphicon glyphicon-stop' },
        { id: 'icon-zoom-in', title: 'Zoom in', iconClass: 'glyphicon glyphicon-zoom-in' },
        { id: 'icon-zoom-out', title: 'Zoom out', iconClass: 'glyphicon glyphicon-zoom-out' },
        { id: 'icon-trash', title: 'Remove', iconClass: 'glyphicon glyphicon-trash' }
      ],
      items: {
        type: 'object',
        properties: {
          'id': {
            title: 'Label',
            description: 'Label',
            path: '@id',
            type: 'string'
          },
          'title': {
            title: 'Label',
            description: 'Label',
            path: '@title',
            type: 'string'
          },
          'iconClass': {
            title: 'Icon Class',
            description: 'The icon class',
            path: '@class',
            type: 'string'
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
    /**
     *
     * Ok and then you come to the point where they should be applied
     * both first and then render.
     *
     */
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
    },
    data: {

    }
  }
}
