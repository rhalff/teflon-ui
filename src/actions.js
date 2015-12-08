import Dot from 'dot-object'

/***
 *
 * These are the application events
 * Those wiring up the different components
 */
export default {
  'iconBar': [
    {
      //path: 'iconBar.play'
      //path: 'iconBar.stop'
      //path: 'bottomBar.bulletList.(on)repeat'
      //path: 'bottomBar.bulletList.mouseover'
      name: 'PLAY',
      val: function(ev) {
        console.log('PLAY', ev)
        if (!this.inState('play')) {
          this.activateState('play')
          alert('playing')
        }
      }
    },
    {
      name: 'STOP',
      val: function(ev) {
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
      val: function(action, ev) {
        console.log(action, ev)
      }
    }
  ],
  'navBar': [
    {
      name: 'FLOW.*',
      val: function(action, ev) {
        console.log(action, ev)
      }
    },
    {
      name: 'AUTOCOMPLETE',
      val: function(ev) {
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
        // we should start to request for suggestions here.
        // the caveat is cancelling old requests.
        // is flow based good enough for that.
        // or should there be more concrete sollutions.
        // what is the most optimal way to cancel these things.
        // flowbased like I've done now is kinda singleton queueing.
        // which is bad. Subgraphs *are* instances.
        // it is about visualization I think.
        //
        // Multi Instance (Repeat);
        // =====
        // || ||
        // =====
        //
        // One instance
        // -----
        // |   |
        // -----
        // The instance is important, normally flow based does not keep
        // reference to an instance, I do
        // cancel is intresting, because chix-flow should actually lookup
        // which node is currently within that chain and cancel at that moment.
        // which means a lot of maintainance. freeing ports etc.

      }
    }
  ],
  'bullets': [
    {
      name: '*',
      val: function(action, ev, path) {
       // quick test, actually also a state
       // document.body.addClass('v' + nr)
        // gah, werkt niet lekker, beter react dan maar.
        // het wordt te ver gezocht.
        // what info do I need here?
        // what to do with state and data.
        // React always has it available in this.state
        // for me the state is a teflon/component instance itself.
        // There is a this.state but that's the UI view state.
        // I could change it to have this.state contain the current data state.
        // and use something different for the UI state.
        // maybe use this.input best I can come up with now.
        // yeah for now that's ok.
        // then I have always access to the last input.
        // next:
        //  - path is important
        //  - ev is important
        //  - nr in case of a repeat.
        //  - this.input
        //  - this.state & methods
        // not sure if I need the path though, do I?
        // index is more important.
        // Or, I fetch the current data from the UI. itself.
        //
        console.log(action, ev, this.srcElement)
      }
    }
  ]
}