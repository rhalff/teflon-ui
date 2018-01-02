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
