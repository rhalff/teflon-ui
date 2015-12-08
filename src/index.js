import navBarState from './states/navBar'
import bulletBar from './components/bulletBar'
import windowBar from './components/windowBar'
import iconBar from './components/iconBar'
import UI from './ui'
import actions from './actions'
import Store from './store'
import request from 'superagent'

let ui
window.ui = ui = new UI()
ui.addComponent('navBar', 'navBarTpl', '#navBarPosition', navBarState)
ui.addComponent('selection', 'selectionControlTpl', '#selectionControl')
ui.addComponent('serverSwitch', 'serverSwitchTpl', '#server-switch')

ui.addComp('windowBar', '#windowControl', windowBar)
ui.addComp('bullets', '#bullets', bulletBar)
ui.addComp('iconBar', '#iconBarPosition', iconBar)

ui.setActions(actions)
ui.render()

let store
window.store = store = new Store()

request.get('https://serve-chix.rhcloud.com/flows').then((res) => {
  store.set('flows', res.body)
})

request.get('https://serve-chix.rhcloud.com/nodes').then((res) => {
  store.set('nodes', res.body)
})

Actor.sendIIP(
  {id: 'GetGraph', port: 'url'},
  'https://serve-chix.rhcloud.com/flow/b054ed19-fe60-4578-939b-10cdba03ad41'
)
Actor
  .getNode('GetGraph')
  .getNode('End')
  .on('output', (out) => {
    if (out.port === 'body') {
      console.log('Our body', out)
    }
})

// so now also a logic layer.
// I'm also still missing jsPlumb part to actually load a graph.
// and ofcourse the typeahead thing.

// ok and this is then when chix-flow should be wired up.
// to handle for example the key downs.
// I know the value of the input is easily available useing srcElement.value.
// but don't wanna do it like that.
// How about each component get's access to the store within it's own namespace.
// where the global store holds all.
// A store of stores where each store can has it's own adapter.
// that'll be kinda wicked.
// Store then contains.. the named instances. it's path in the main store is the mount path.
// nope.

