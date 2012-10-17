//= require_tree ./view

Ext.ns("Talho.Epi.RODS")

Talho.Epi.RODS.Controller = Ext.extend(Ext.util.Observable, {
  constructor: function(config){
    Ext.apply(this, config);
    
    var panel = new Talho.Epi.RODS.view.Layout();
    
    panel.on('filter', this.changeFilter, this);
    this.filter = {};
    
    this.getPanel = function(){
      return panel;
    }
    
    Talho.Epi.RODS.Controller.superclass.constructor.apply(this, arguments);
  },
  
  changeFilter: function(name, newVal){
    if(newVal == ''){
      delete this.filter[name];
    }
    else{
      this.filter[name] = newVal;
    }
    
    this.getPanel().loadGraphs(this.filter);
  }
});


Talho.ScriptManager.reg('Talho.Epi.RODS', Talho.Epi.RODS.Controller, function(config){
  var cont = new Talho.Epi.RODS.Controller(config);
  return cont.getPanel();
});
