//= require_tree ./view

Ext.ns("Talho.Epi.Admin.Users")

Talho.Epi.Admin.Users.Controller = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    Ext.apply(this, config);
    
    var panel = new Talho.Epi.Admin.Users.view.Layout({
      listeners: {
        scope: this,
        'userselect': this.user_select
      }
    });
    this.getPanel = function(){
      return panel;
    }
  },
  
  user_select: function(user_id, name){
    var layout = this.getPanel();
    while(layout.items.last() !== layout.items.first()){
      layout.items.last().destroy();
    }
    
    layout.add(new Talho.Epi.Admin.Users.view.Details({flex: 1, userId: user_id, userName: name}));
    layout.add(new Talho.Epi.Admin.Users.view.Facilities({flex: 1, userId: user_id, userName: name}));
    layout.doLayout();
  }
});


Talho.ScriptManager.reg('Talho.Epi.Admin.Users', Talho.Epi.Admin.Users.Controller, function(config){
  var cont = new Talho.Epi.Admin.Users.Controller(config);
  return cont.getPanel();
});

