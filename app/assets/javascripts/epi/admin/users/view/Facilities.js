
Ext.ns("Talho.Epi.Admin.Users.view");

Talho.Epi.Admin.Users.view.Facilities = Ext.extend(Ext.Panel, {
  layout: 'fit',
  border: false,
  initComponent: function(){
    var cbsm = new Ext.grid.CheckboxSelectionModel({checkOnly: true, singleSelect: false, listeners: {scope: this, 'selectionchange': this.facility_selectionchange}});
    this.grid = new Ext.grid.GridPanel({store: new Ext.data.JsonStore({
          url: '/epi/admin/users/facilities.json',
          baseParams: {user_id: this.userId},
          restful: true,
          fields: ['name', 'id', {name: 'selected', type: 'boolean'}],
          listeners: {
            scope: this,
            load: this.store_load
          }
        }),
        columns: [cbsm, {id: 'name', dataIndex: 'name'}],
        autoExpandColumn: 'name', hideHeaders: true, title: 'Facilities',
        sm: cbsm
      });
    this.items = [
      this.grid
    ]
    
    this.grid.on('afterrender', this.load, this, {delay: 10, single: true});
    
    Talho.Epi.Admin.Users.view.Facilities.superclass.initComponent.apply(this, arguments);
  },
  
  load: function(){
    this.grid.getStore().load();
  },
  
  store_load: function(store, records, options){
    var selected = [];
    
    store.each(function(r, i){
      if(r.get('selected')){
        selected.push(i);
      }
    }, this);
    
    this.grid.getSelectionModel().suspendEvents();
    this.grid.getSelectionModel().selectRows(selected);
    this.grid.getSelectionModel().resumeEvents();
  },
  
  facility_selectionchange: function(sm){
    var selected = sm.getSelections(),
        facilities = [];
        
    Ext.each(selected, function(sel){
      facilities.push(sel.get('id'));
    });
    
    this.fireEvent('userupdate', this.userId, {"user_detail[rods_facilities]": facilities.join(',')});
  }
});
