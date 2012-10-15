//= require_tree ./view

Ext.ns("Talho.Epi.RODS")

Talho.Epi.RODS.Controller = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    Ext.apply(this, config);
    
    var panel = new Talho.Epi.RODS.view.Layout();
    this.getPanel = function(){
      return panel;
    }
    
    Talho.Epi.RODS.Controller.superclass.constructor.apply(this, arguments);
  }
});


Talho.ScriptManager.reg('Talho.Epi.RODS', Talho.Epi.RODS.Controller, function(config){
  var cont = new Talho.Epi.RODS.Controller(config);
  return cont.getPanel();
});
