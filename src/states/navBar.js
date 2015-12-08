export default {
  'default': {
    events: [
      { path: 'new-flow', op: 'add', name: 'click', val: 'FLOW.NEW'},
      { path: 'save-flow', op: 'add', name: 'click', val: 'FLOW.SAVE'},
      { path: 'save-flow-as', op: 'add', name: 'click', val: 'FLOW.SAVEAS'},
      { path: 'unclutter', op: 'add', name: 'click', val: 'FLOW.UNCLUTTER'},
      { path: 'run-flow', op: 'add', name: 'click', val: 'FLOW.RUN'},
      { path: 'searchForm', op: 'add', name: 'keyup', val: 'AUTOCOMPLETE'}
    ]
  }
}
