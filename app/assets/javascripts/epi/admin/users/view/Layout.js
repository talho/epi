
Ext.ns("Talho.Epi.Admin.Users.view");

Talho.Epi.Admin.Users.view.Layout = Ext.extend(Ext.Panel, {
  layout: 'hbox', 
  title: 'Epi-D User Admin',
  closable: true,
  layoutConfig: {defaultMargins: '5', align: 'stretch'},
  initComponent: function(){
    this.items = [
      new Talho.Epi.Admin.Users.view.Users({flex: 1}),
      {xtype: 'box', flex: 1},
      {xtype: 'box', flex: 1}
    ]
    
    Talho.Epi.Admin.Users.view.Layout.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('talho-epi-admin-users-layout', Talho.Epi.Admin.Users.view.Layout);
