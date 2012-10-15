
Ext.ns("Talho.Epi.RODS.view");

Talho.Epi.RODS.view.Filters = Ext.extend(Ext.Container, {
  layout: 'form',
  labelAlign: 'top',
  defaults: {
    anchor: '100%'
  },
  padding: '15px 5px',
  initComponent: function(){
    this.items = [
      {xtype: 'textfield', fieldLabel: 'Facility'},
      {xtype: 'textfield', fieldLabel: 'Gender'},
      {xtype: 'textfield', fieldLabel: 'Syndrome'},
      {xtype: 'textfield', fieldLabel: 'Zip'}
    ]
    
    Talho.Epi.RODS.view.Filters.superclass.initComponent.apply(this, arguments);
  }
});
