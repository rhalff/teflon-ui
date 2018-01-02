import Dot from 'dot-object'

/***
 *
 * These are the application events
 * Those wiring up the different components
 */
export default {
  'iconBar': [
    {
      // path: 'iconBar.play'
      // path: 'iconBar.stop'
      // path: 'bottomBar.bulletList.(on)repeat'
      // path: 'bottomBar.bulletList.mouseover'
      name: 'PLAY',
      val: function (ev) {
        console.log('PLAY', ev)
        if (!this.inState('play')) {
          this.activateState('play')
          alert('playing')
        }
      }
    },
    {
      name: 'STOP',
      val: function (ev) {
        console.log('STOP', ev)
        if (this.inState('play')) {
          this.disableState('play')
          alert('stopped')
        }
      }
    }
  ],
  'windowBar': [
    {
      name: '*',
      val: function (action, ev) {
        console.log(action, ev)
      }
    }
  ],
  'navBar': [
    {
      name: 'FLOW.*',
      val: function (action, ev) {
        console.log(action, ev)
      }
    },
    {
      name: 'AUTOCOMPLETE',
      val: function (ev) {
        let str = String.fromCharCode(ev.keyCode)
        console.log('YOUR KEY', str)

        /**
        Actor.sendIIP(
          {id: 'Search', port: 'url'},
          'https://serve-chix.rhcloud.com/nodes'
        )
        **/

        // let everything work with paths
        console.log('YOUR INPUT', Dot.pick('srcElement.value', ev))
      }
    }
  ],
  'bullets': [
    {
      name: '*',
      val: function (action, ev, path) {
        console.log(action, ev, this.srcElement)
      }
    }
  ]
}
