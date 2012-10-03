//= require ext_extensions/Graph

Ext.ns('Talho.Epi.RODS.view');

Talho.Epi.RODS.view.Graphs = Ext.extend(Ext.Panel, {
  layout: 'table',
  layoutConfig: {
    tableAttrs: {
        style: {
            margin: '10px auto',
            'text-align': 'center'
        }
    },
    columns: 2
  },
  
  initComponent: function(){
    Ext.Ajax.request({
      method: 'GET',
      url: '/epi/rods/search.json',
      success: this._load_data,
      scope: this
    });
    
    Talho.Epi.RODS.view.Graphs.superclass.initComponent.apply(this, arguments);
  },
  
  _load_data: function(response){
    var json = Ext.decode(response.responseText);
    
    var rec = Ext.data.Record.create([{name: 'date', type: 'date'}, 'Constitutional', 'Fever', 'GI', 'ILI', 'Neurological', 'Respiratory']),
        store = new Ext.data.JsonStore({
          fields: rec,
          data: json.results
        });
    
    this.add(
      new Talho.ux.Graph({
        store: store,
        width: this.getWidth()/2 - 40,
        height: 400,
        xField: 'date',
        showLegend: true,
        xDisplayName: 'Report Date',
        series: [{type: 'line', displayName: 'Constitutional', yField: 'Constitutional', 
          style: { mode: 'stretch', stroke:"#D66", color: 0x99BBE8 }
        },
        {type: 'line', displayName: 'Fever', yField: 'Fever', 
          style: { mode: 'stretch', stroke:"#581", color: 0x99BBE8 }
        },
        {type: 'line', displayName: 'GI', yField: 'GI', 
          style: { mode: 'stretch', stroke:"#159", color: 0x99BBE8 }
        },
        {type: 'line', displayName: 'Neurological', yField: 'Neurological', 
          style: { mode: 'stretch', stroke:"#629", color: 0x99BBE8 }
        },
        {type: 'line', displayName: 'Respiratory', yField: 'Respiratory', 
          style: { mode: 'stretch', stroke:"#B59", color: 0x99BBE8 }
        },
        {type: 'line', displayName: 'ILI', yField: 'ILI', 
          style: { mode: 'stretch', stroke:"#522", color: 0x99BBE8 }
        }]
      })
    );
    
    
    this.doLayout();
  }
});
