import Emitter from 'wildemitter'

export default class Store {

 constructor() {
   // make it switchable with index db
   this.adapter = new Map()
 }

 set(name, val) {
   this.adapter.set(name, val)
   this.emit('set', name, val)
 }

 get(name) {
   return this.adapter.get(name)
 }

 has(name) {
   return this.adapter.get(name)
 }

 keys() {
   return this.adapter.keys(name)
 }

 delete(name) {
   this.adapter.delete(name)
   this.emit('delete', name)
 }

 clear() {
   this.adapter.clear()
   this.emit('delete', name)
 }
}

Emitter.mixin(Store)