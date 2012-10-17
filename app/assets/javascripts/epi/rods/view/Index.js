
Ext.ns('Talho.Epi.RODS.veiw');

Talho.Epi.RODS.view.Index = Ext.extend(Ext.Panel, {
  title: 'Index',
  header: false,
  border: false,
  layout: 'border',
  initComponent: function(){
    this._graphs = new Talho.Epi.RODS.view.Graphs({region: 'center'});
    this.items = [
      new Talho.Epi.RODS.view.Filters({region: 'west', width: 200, margins: '0 10'}),
      this._graphs
    ];
    
    Talho.Epi.RODS.view.Index.superclass.initComponent.apply(this, arguments);
  },
  
  loadGraphs: function(params){
    this._graphs.load(params);
  }
});
