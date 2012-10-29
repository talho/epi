//= require ext_extensions/BootstrapBreadcrumbContainer

Ext.ns('Talho.Epi.RODS.view');

Talho.Epi.RODS.view.Layout = Ext.extend(Ext.Panel, {
  layout: 'border',
  closable: true,
  border: false,
  title: 'RODS',
  initComponent: function(){
    this._index = new Talho.Epi.RODS.view.Index({});
        
    this.cardPanel = new Ext.Panel({
      border: false,
      layout: 'card',
      region: 'center',
      activeItem: 0,
      items: this._index
    });
    
    this.items = [
      {xtype: 'bootstrapbreadcrumb', region: 'north', panel: this.cardPanel},
      this.cardPanel
    ]
    
    Talho.Epi.RODS.view.Layout.superclass.initComponent.apply(this, arguments);
  },
  
  loadGraphs: function(params){
    this._index.loadGraphs(params);
  }
});

Ext.reg('talho-epi-rods-layout', Talho.Epi.RODS.view.Layout);
