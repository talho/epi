
Ext.ns("Talho.Epi.Admin.Users.view");

Talho.Epi.Admin.Users.view.Details = Ext.extend(Ext.Panel, {
  padding: '5',
  layout: 'form',
  labelAlign: 'top',
  defaults: {anchor: '100%'},
  constructor: function(){
    Talho.Epi.Admin.Users.view.Details.superclass.constructor.apply(this, arguments);
    this.addEvents('userupdate');
  },
  initComponent: function(){
    this.items = [
      {xtype: 'box', html: '<h1>' + this.userName + '</h1>'},
      {xtype: 'combo', itemId: 'rods_databases', fieldLabel: 'RODS Database', store: new Ext.data.JsonStore({
        url: '/epi/admin/users/rods_databases.json',
        baseParams: {user_id: this.userId},
        restful: true,
        fields: ['name', {name: 'selected', type: 'boolean', defaultValue: false}],
        root: 'rods',
        autoLoad: true,
        listeners: {
          scope: this,
          'load': this.rods_databases_load
        }
      }), valueField: 'name', displayField: 'name', forceSelection: true, mode: 'local', triggerAction: 'all',
      listeners: {
        scope: this,
        'select': this.rods_databases_select
      }}
    ]
    
    Talho.Epi.Admin.Users.view.Details.superclass.initComponent.apply(this, arguments);
  },
  
  rods_databases_load: function(store, records, options){
    var combo = this.getComponent('rods_databases'),
        sel;
  
    combo.suspendEvents();
    
    sel = Ext.partition(records, function(rec){return rec.get('selected');})[0][0];
    if(sel){
      combo.setValue(sel.get('name'));
    }
    
    combo.resumeEvents();
  },
  
  rods_databases_select: function(combo, record, index){
    this.fireEvent('userupdate', this.userId, {'user_detail[rods_database]': record.get('name')});
  }
});
