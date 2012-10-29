
Ext.ns("Talho.Epi.RODS.view");

Talho.Epi.RODS.view.Filters = Ext.extend(Ext.Container, {
  layout: 'form',
  labelAlign: 'top',
  defaults: {
    anchor: '100%'
  },
  padding: '15px 5px',
  constructor: function(){
    Talho.Epi.RODS.view.Filters.superclass.constructor.apply(this, arguments);
    this.addEvents('filter');
    this.enableBubble('filter');
  },
  
  initComponent: function(){
    var initList = (function(){
      if(!this.tpl){
        this.tpl = new Ext.XTemplate('<tpl for=".">',
                                        '<div class="x-combo-list-item">{' + this.displayField + ':this.blank}</div>',
                                      '</tpl>', 
                                      {compiled: true, blank: function(val){
                                        return val === '' ? '&nbsp;' : val;
                                      }});
      }
    }).createSequence(Ext.form.ComboBox.prototype.initList);
    
    this.zip = '';
    
    var facility_store = new Ext.data.JsonStore({
      url: '/epi/rods/providers.json',
      restful: true,
      data: [{P_PID: '', P_NAME: ''}],
      fields: ['P_PID', 'P_NAME']
    });
    facility_store.load({add: true});
    
    var yesterday = new Date();
    yesterday.setTime(Number(yesterday) - 864e5);
    
    this.items = [
      {xtype: 'datefield', fieldLabel: 'Start Date (default 7 days ago)', name: 'start_date', maxValue: yesterday, editable: false, listeners: {'select': this.date_select, scope: this}},
      {xtype: 'datefield', fieldLabel: 'End Date (default today)', name: 'end_date', maxValue: new Date(), editable: false, listeners: {'select': this.date_select, scope: this}},
      {xtype: 'combo', fieldLabel: 'Facility', store: facility_store, name: 'facility', initList: initList, mode: 'local', forceSelection: true, triggerAction: 'all', displayField: 'P_NAME', valueField: 'P_PID', listeners: {'select': this.combo_select, scope: this}},
      {xtype: 'combo', fieldLabel: 'Gender', store: [['', ''], ['m', 'Male'], ['f', 'Female']], name: 'gender', initList: initList, forceSelection: true, triggerAction: 'all', mode: 'local', listeners: {'select': this.combo_select, scope: this}},
      {xtype: 'combo', fieldLabel: 'Age', store: [['', ''], ['c', 'Child'], ['a', 'Adult']], name: 'age', initList: initList, forceSelection: true, triggerAction: 'all', mode: 'local', listeners: {'select': this.combo_select, scope: this}},
      {xtype: 'numberfield', fieldLabel: 'Patient Zip Code', maxLength: 5, name: 'patient_zip', enableKeyEvents: true, listeners: {'change': this.text_change, 'keypress': this.enter_press, scope: this}}
    ]
    
    Talho.Epi.RODS.view.Filters.superclass.initComponent.apply(this, arguments);
  },
  
  getBubbleTarget: function(){
    if(!this.layoutParent){ // bubble up to the layout class way up above
      this.layoutParent = this.findParentByType('talho-epi-rods-layout');
    }
    return this.layoutParent;
  },
  
  date_select: function(f, date){
    this.fireEvent('filter', f.getName(), date.toJSON());
  },
  
  combo_select: function(combo, record, index){
    this.fireEvent('filter', combo.getName(), record.get(combo.valueField));
  },
  
  text_change: function(f, newVal, oldVal){
    if(newVal !== this.zip){
      this.zip = newVal;
      this.fireEvent('filter', f.getName(), newVal);
    }
  },
  
  enter_press: function(f, e){
    if(e.ENTER === e.getKey() && this.zip !== f.getValue()){
      this.zip = f.getValue();
      this.fireEvent('filter', f.getName(), this.zip);
    }
  }
});
