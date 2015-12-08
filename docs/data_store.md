# Data Store

When an event is dispatched we listen to it.

We will have the event information and we will know the origin path.
We will also optionally get the index, which referes to an item number.

The first thing done is lookup the corresponding data item.
We do this by reverse mapping the path we've got and compare it with our store.

This will point directly to the data section, but also will give us an idea.
Where in the tree this data originates.

Then we can choose to operate on this data.

Event -> (ev, path, index) -> Lookup relevant Data from store

Yet again, flow based, is difficult because we can easily loose our context.
This means there must be a way to remember our context several nodes from now.

-------------------------- Context --------------------------------
|  path, store Item, Event
|  ________         --------         --------
| | NODE 1 | ----> | NODE 2 | ----> | NODE 3 |
|  --------         --------         --------
|



## Internal external Events.

There is a distinction between events triggering to modify the state
of the component itself, and events which are handled externally.
Going further into the application flow.