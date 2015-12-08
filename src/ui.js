import Component from 'teflon'
import DomPointer from 'dompointer'
import Dot from 'dot-object'
//import loaders from './loaders'
import assert from 'assert'
import _ from 'lodash'

Dot.useArray = true

// This UI thing will become Teflon
// and Teflon will become Teflon.Component
export default class UI {
  constructor() {
    this.components = new Map()
    /**
     *
     * Keeps track of the data state of each component.
     *
     * Keys are the components.
     *
     * @type {Map}
     */
    this.state = new Map()
  }

  /**
   *
   * TODO: unfinished, first type will be what is now the default
   *
   * @param {Object} def Component Definition
   * @returns {Teflon}
   */
  static load(def) {
    if (def.type) {
      if (loaders[def.type]) {
        const component =  loaders.load(def)
        this.components.set(
          id,
          component
        )
        return component
        //new Teflon(DomPointer.create(el))
      } else {
        throw Error(`Unable to find loader for type ${def.type}`)
      }
    }
  }

  static register(name, loader) {
    loaders[name] = loader
  }

  /**
   *
   * Fills the given component with data.
   *
   * Main responsibility is to keep track of the state for this component.
   *
   * @param component
   * @param data
   */
  fill(comp, data) {
    // cannot just set replace the state, it must be merged.
    this.state.set(comp.name,
      _.merge(this.state.get(comp.name), data)
    )
    comp.fill('default', data)

    // could also have a different render policy (e.g. animation frame)
    comp.render()
  }

  // first make this load the default format
  addComp(name, target, def) {
    const _this = this
    assert(def, 'Need a definition')
    assert(def.template, 'Need a template')

    function internalRun(type, func) {
      // should make async possible
      if (type === 'data') {
        return function(ev){
          // TODO: * from within component will not work
          // I want to remove this state, state will be external.
          // only thing to pass will be PATH.
          // but how to do it internally then?
          const res = func(ev, _this.state.get(this.name))
          Dot.object(res)
          _this.fill(this, res)
        }
      } else if(type === 'ui') {
        return function(ev, src){

          // TODO: make src.dataset.teflonIndex prettier

          // ok, the idea was I can omit path in the attributes state definition.
          // and if it's the case, we dynamically add it.
          // so now I must do so, but where?
          // src, ok, and then get the path, this.dp.path(
          // seems to me the second parameter should be path?
          // it's not about the src element here, it's what we get back.
          //

          // TODO: * from within component will not work
          const res = func(ev, _this.state.get(this.name), src)
          // TODO: what to do about unsetting the state?
          // who must command it?
          if (res) {
            Object.keys(res).forEach((path) => {
              // TODO: teflon does not yet understand el as parameter.
              // err nice and how to disable? :-)
              this.activateState(res[path], this.dp.resolve(path)) // this.dp.getRef(path))
            })
          }
          this.render()
        }
      } else {
        throw Error('Unsupported handler type')
      }
    }

    const el = document.querySelector(target)
    const comp = new Component(
      DomPointer.fromHTML(def.template)
    )
    // Name should be required for a component, the ns should make it unique
    comp.name = name
    comp.setElement(el)
    if (def.mapping) {
      // gah what to do with @attr
      comp.setTemplateMap(def.mapping)
    }
    if (def.properties) {
      let dataMap = {}
      let initialState = {}

      // this translation is too simple
      Object.keys(def.properties).forEach(name => {
        dataMap[def.properties[name].path] = name
        switch (def.properties[name].type) {
          case "array":
            // ok this gives a slight problem and triggers a bug.
            // it renders nothing first, but it also does not delete the li correctly.
            // it seems to remove what is within the li.
            // anyway after that what it needs is not found
            // or do I not use cloneNode(true) somewhere?

            // This triggers the bug
            // initializing bullets to []
            let key2 = def.properties[name].path
            initialState[key2] = []
            dataMap[key2] = {}
            dataMap[key2].path = name
            dataMap[key2].items = {}
            // should not be like this but try for now
            Object.keys(def.properties[name].items.properties).forEach((key) => {
              const it = def.properties[name].items.properties[key]
              dataMap[key2].items[it.path] = key
            })
            break
          case "object":
            initialState[name] = {}
            break
        }
        if (def.properties[name].hasOwnProperty('default')) {
          initialState[name] = def.properties[name]['default']
        }
      })
      console.log('initialState', initialState)
      console.log('dataMap', dataMap)
      comp.link('default', 'data', dataMap)
      this.state.set(comp.name, {})
      // important must be ran before the handlers are installed
      /**
       *const map = {
          'listItem': {
            path: 'test',
            items: {
              ':0': 'name'
            }
          }
        }
       */
      _this.fill(comp, initialState)

      // set states after fill so dynamic id's are known
      // only half of a solution this
      if (def.states) {
        comp.setStateMap(def.states)
      }
    }
    /*
    if (def.data) {
      Object.keys(def.data).forEach(name {
        comp.link(name, 'data', def.data[name])
      })
    }
    */
    if (def.handlers) {
      Object.keys(def.handlers).forEach(type => {
        Object.keys(def.handlers[type]).forEach(action => {
          comp.on(action, internalRun(type, def.handlers[type][action].bind(comp)))
        })
      })
    }
    //comp.ns = 'psichi'
    this.components.set(name, comp)
    return comp
  }

  // load the default format
  addComponent(name, tplId, target, state) {
    const tpl = document.getElementById(tplId)
    const el = document.querySelector(target)
    const comp = new Component(DomPointer.fromHTML(tpl.innerHTML))
    comp.setElement(el)
    if (state) {
      comp.setStateMap(state)
    }
    // Name should be required for a component, the ns should make it unique
    comp.name = name
    //comp.ns = 'psichi'
    this.components.set(name, comp)
    return comp
  }

  /**
   * Nicely formatted list of all available actions
   * Can be derived from the eventMaps
   */
  getActionList() {

  }

  setActions(actions) {
    Object.keys(actions).forEach(name => {
      for (const action of actions[name]) {
        if (this.components.has(name)) {
          const comp = this.components.get(name)
          comp.on(action.name, function () {
            action.val.apply(this, arguments)
            this.render()
          }.bind(comp))
        } else {
          throw Error(`Component ${name} does not exist`)
        }
      }
    })
  }

  render() {
    for(const comp of this.components.values()) {
      comp.render()
    }
  }
}