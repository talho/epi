//= require ext_extensions/BootstrapBreadcrumbContainer

Ext.ns('Talho.Epi.RODS.view');

Talho.Epi.RODS.view.Layout = Ext.extend(Ext.Panel, {
  layout: 'border',
  closable: true,
  border: false,
  title: 'RODS',
  initComponent: function(){
    this.cardPanel = new Ext.Panel({
      border: false,
      layout: 'card',
      region: 'center',
      activeItem: 0,
      items: new Talho.Epi.RODS.view.Index({})
    });
    
    this.items = [
      {xtype: 'bootstrapbreadcrumb', region: 'north', panel: this.cardPanel},
      this.cardPanel
    ]
    
    Talho.Epi.RODS.view.Layout.superclass.initComponent.apply(this, arguments);
  }
});
