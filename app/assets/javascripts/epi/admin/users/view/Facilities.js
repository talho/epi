
Ext.ns("Talho.Epi.Admin.Users.view");

Talho.Epi.Admin.Users.view.Facilities = Ext.extend(Ext.Panel, {
  layout: 'fit',
  initComponent: function(){
    var cbsm = new Ext.grid.CheckboxSelectionModel({checkOnly: true, singleSelect: false});
    this.grid = new Ext.grid.GridPanel({store: new Ext.data.JsonStore({
          fields: ['name', 'code', {name: 'selected', type: 'boolean'}],
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
    
    this.grid.on('afterrender', function(){
      this.grid.getStore().loadData([{name: 'Midland Hospital', code: 'MSH', selected: false}, {name: 'Odessa Hospital', code: 'OSD', selected: true}]);
    }, this, {delay: 10, single: true});
    
    Talho.Epi.Admin.Users.view.Facilities.superclass.initComponent.apply(this, arguments);
  },
  
  store_load: function(store, records, options){
    var selected = [];
    
    store.each(function(r, i){
      if(r.get('selected')){
        selected.push(i);
      }
    }, this);
    
    this.grid.getSelectionModel().selectRows(selected, true);
  }
});
