# UI and flow

 - nodes encapsulate
 - nodes the only place where logic exists (functions)
 - rest is data flow
 - UI does not contain logic
 - UI dispatches events/actions
 - Actions are handled by nodes
 - either in chain, or more complex graphs
 - middleware chain is a certain kind of flow
 - stream processing is a certain kind of flow
 - Graphs are not good at flows
 - Graphs scatter
 - Scatter is not always bad, it's just a relevan property
 - Packets can carry data
 - Packets can contain meta data
 - Packets can have a live time
 - Packets can carry specific information
 - Packet flow is more complex then data streams
 - Data streams are for homogenous data
 - Data streams can change appearance over time
 - Packets change appearance by default, almost every hop
 - Packets can be read-only non changing
 - A changed appearance is a combining of read only packets
 - A changed appearance can be a collection of read only packets
   and new packets. Which makes the whole look changed.
   Also can lack packets, dropped packets. Which makes the whole
   Seem reduced.

UI

Appearance, Visual, Clear, Easy, Comprehensible

There should be only one output pipe for the whole UI.
Where each packet is an action with specific information.
From there the packet gets routed.
This means you send them different ways.
Instead of binding to an action and then writing a listener for it
and then attach it to your code, where you then can
import/require code directly and basically ruin the entire flow.

So you could see the whole UI as having just one input and one output port.

All events are squeezed out of the output port contain there specific
data. All in the save action structure, they could be of different types
if desired, but all from the same base class.

It's a bit confusing because I could make a Teflon Node and put that in chix-flow.
But the main benefit is that Teflon fits this kind of data flow.

So all that node needs is Teflon, an input template, and the maps.
But now also the question, should the rest of the logic already be done using
chix-flow, I think so.

I'm talking about the composition part of the Teflon Components.
That composition part is harder. Because many/many components must be composable
And this composability is all about the dom. and placement.

Teflon should take care of that, not chix-flow
An entire Application UI will be handled by just one teflon node.

What each component is using, is up to the component.
My component will use chix-flow.

Then chix flow will have output somewhere and this output can then be
redirected again to another part of the application

```javascript
Teflon UI -> (filterAction) -> (graph) ----------------> Teflon UI
                            `----> (different route) --> Teflon UI
                             `---> (other direction) --> Teflon UI
```

Also node how a chix-flow can be compiled into a normal API
So you'll end up with a UI and API
You'll end up with super customizable applications.

