export default {
  type: 'Teflon', // default definition format
  title: 'Navigation Bar',
  tag: 'NavBar',
  template: `
    <nav role="navigation" class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-header">
            <button type="button" data-toggle="collapse" data-target=".navbar-ex1-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#" class="navbar-brand">Chiχ UI</a>
            <form role="search" class="navbar-form navbar-left">
                <div class="form-group">
                    <span class="twitter-typeahead" style="position: relative; display: inline-block;"><input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled="" style="position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; background: none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255);"><input id="searchForm" type="search" placeholder="open flow or add nodes" class="typeahead search form-control tt-query" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top; background-color: transparent;"><span style="position: absolute; left: -9999px; visibility: hidden; white-space: nowrap; font-family: Jura, Helvetica, serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></span><span class="tt-dropdown-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none;"></span></span>
                </div>
            </form>
        </div>
        <psichi:FlowControl class="collapse navbar-collapse navbar-ex1-collapse">
        </psichi:FlowControl>
    </nav>
  `,
  mapping: {
    'button': ':0:0'
  },
  states: {
    'default': {
      events: [
        { path: 'new-flow', op: 'add', name: 'click', val: 'NEWFLOW'}
      ]
    },
    'play': {
      attributes: [
        { path: 'icon-play', op: 'add', name: 'class', val: 'active'}
      ]
    }
  },
  properties: {
    'bullets': {
      title: 'A button',
      path: 'button',
      type: 'array',
      'default': [
        // iconClass is not how it should be, rethink that later
        { id: 'icon-close', title: 'Remove', iconClass: 'glyphicon glyphicon-remove' }
      ],
      items: {
        type: 'object',
        properties: {
          'id': {
            title: 'Label',
            description: 'Label',
            path: '@id',
            type: 'string'
          },
          'title': {
            title: 'Label',
            description: 'Label',
            path: '@title',
            type: 'string'
          },
          'iconClass': {
            title: 'Icon Class',
            description: 'The icon class',
            path: '@class',
            type: 'string'
          }
        }
      }
    }
  }
}
