
Ext.ns("Talho.Epi.Admin.Users.view");

Talho.Epi.Admin.Users.view.Details = Ext.extend(Ext.Panel, {
  padding: '5',
  layout: 'form',
  labelAlign: 'top',
  defaults: {anchor: '100%'},
  initComponent: function(){
    this.items = [
      {xtype: 'box', html: '<h1>' + this.userName + '</h1>'},
      {xtype: 'combo', fieldLabel: 'RODS Database', store: new Ext.data.JsonStore({
        url: '/epi/admin/users/databases.json',
        restful: true,
        fields: ['name'],
        root: 'rods',
        autoLoad: true
      }), valueField: 'name', displayField: 'name', forceSelection: true, mode: 'local', triggerAction: 'all'}
    ]
    
    Talho.Epi.Admin.Users.view.Details.superclass.initComponent.apply(this, arguments);
  }
});
