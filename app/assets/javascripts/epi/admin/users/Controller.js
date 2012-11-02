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
    
    this.detail = layout.add(new Talho.Epi.Admin.Users.view.Details({flex: 1, userId: user_id, userName: name, listeners: {scope: this, 'userupdate': this.user_update}}));
    this.facilities = layout.add(new Talho.Epi.Admin.Users.view.Facilities({flex: 1, userId: user_id, userName: name, listeners: {scope: this, 'userupdate': this.user_update}}));
    layout.doLayout();
  },
  
  user_update: function(userId, params){
    Ext.Ajax.request({
      url: '/epi/admin/users/' + userId + '.json',
      method: 'PUT',
      params: params,
      success: function(){
        this.facilities.load();
      },
      scope: this
    });
  }
});


Talho.ScriptManager.reg('Talho.Epi.Admin.Users', Talho.Epi.Admin.Users.Controller, function(config){
  var cont = new Talho.Epi.Admin.Users.Controller(config);
  return cont.getPanel();
});

