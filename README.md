# Teflon UI

Should now first work on an editor.

Because I'm not going to handcode this.

**Workflow**:

 - load html
 - load required stylesheets (bootstrap, whatever)
 - Render editor (code-mirror)
 - Set content of editor
 - Render html preview on every update
 - Make html elements selectable.
 - Switch to it's properties panel.

### Layout

Now let's *do* use teflon.

What we'll do is create our interface using bootstrap.
Or whatever, maybe another nice compact framework.

We are at first only going to create all needed templates.
And we will do this in one big html file.

All aspects are created within this file, and all states must be visible.
All siblings which must look alike will be compacted into one.

We will have to define the entry path for each sub template.
Repeat is still outside of the scope of this test. It must be implemented later though.
But let's first keep it simple(r)

Now the nicest would be to find such an editor, for a nice framework.
Ionic? Bootstrap

#### Properties Panel

Properties panel is about the selected element.

We can add events and attributes.

Events can be a list of common event types.
Multiple events can be defined.
Each event is tied to a named action.
The actions can overlap, eg. mouseover can have the same action as a click.

Actions should be remembered, because they can be re-used and
triggered from any element.

An action is just a name and the associated dom event.
Any state must be kept separately. Outside Teflon.

The backend will be a teflon rest api.

Ideally the interface itself will be using Teflon, but first an intermediate interface must
be created.

So to do this right there should be a teflon-ui

Let's use dat as backend.
Which, if we also store the html template within it would allow for reverting any state of
the template at any time.

#### Self test

All events and attribute changes could be self tested, because we have the definitions.
This would also greatly help in defining what works and what not.

