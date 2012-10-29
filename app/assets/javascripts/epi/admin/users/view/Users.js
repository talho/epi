
Ext.ns("Talho.Epi.Admin.Users.view");

Talho.Epi.Admin.Users.view.Users = Ext.extend(Ext.Panel, {
  layout: 'fit',
  constructor: function(){
    Talho.Epi.Admin.Users.view.Users.superclass.constructor.apply(this, arguments);
    this.addEvents('userselect');
    this.enableBubble('userselect');
  },
  getBubbleTarget: function(){
    if(!this.layoutParent){ // bubble up to the layout class way up above
      this.layoutParent = this.findParentByType('talho-epi-admin-users-layout');
    }
    return this.layoutParent;
  },
  initComponent: function(){
    var grid = new Ext.grid.GridPanel({store: new Ext.data.JsonStore({
          fields: ['name', 'id'],
          url: '/epi/admin/users.json',
          restful: true,
          autoLoad: true
        }),
        columns: [{id: 'name', dataIndex: 'name'}],
        autoExpandColumn: 'name', hideHeaders: true, title: 'Users', border: false 
    });
    this.items = [
      grid
    ]
    
    Talho.Epi.Admin.Users.view.Users.superclass.initComponent.apply(this, arguments);
    
    grid.getSelectionModel().on('rowselect', this.user_selected, this)
  },
  
  user_selected: function(sm, i, record){
    this.fireEvent('userselect', record.get('id'), record.get('name'));
  }
});
