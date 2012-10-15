//= require ext_extensions/Graph

Ext.ns('Talho.Epi.RODS.view');

Talho.Epi.RODS.view.Graphs = Ext.extend(Ext.Container, {
  layout: 'hbox',
  layoutConfig: {
    defaultMargins: '0 10 0 0'
  },
  initComponent: function(){
    this.items = [
      {xtype: 'panel',
       title: 'Total',
       flex: 1,
       height: 400,
       layout: 'fit',
       items: [
        new Talho.ux.Graph({
          store: new Ext.data.JsonStore({
            fields: [{name: 'date', type: 'date'}, 'total'],
            url: '/epi/rods/search.json',
            baseParams: {},
            root: 'results',
            restful: true,
            autoLoad: true
          }),
          xField: 'date',
          xDisplayName: 'Report Date',
          series: [{type: 'line', displayName: 'Total', yField: 'total', 
            style: { mode: 'stretch', stroke:"#000", color: 0x000000 }
          }]
        })
      ]},
      {xtype: 'panel',
       title: 'By Syndrome',
       flex: 1,
       height: 400,
       layout: 'fit',
       items: [
        new Talho.ux.Graph({
          store: new Ext.data.JsonStore({
            fields: [{name: 'date', type: 'date'}, 'Constitutional', 'Fever', 'GI', 'ILI', 'Neurological', 'Respiratory'],
            url: '/epi/rods/search.json',
            baseParams: {'by_syndrome': true},
            root: 'results',
            restful: true,
            autoLoad: true
          }),
          xField: 'date',
          showLegend: true,
          xDisplayName: 'Report Date',
          series: [{type: 'line', displayName: 'Constitutional', yField: 'Constitutional', 
            style: { mode: 'stretch', stroke:"#D66", color: 0xD06060 }
          },
          {type: 'line', displayName: 'Fever', yField: 'Fever', 
            style: { mode: 'stretch', stroke:"#581", color: 0x508010 }
          },
          {type: 'line', displayName: 'GI', yField: 'GI', 
            style: { mode: 'stretch', stroke:"#159", color: 0x105090 }
          },
          {type: 'line', displayName: 'Neurological', yField: 'Neurological', 
            style: { mode: 'stretch', stroke:"#629", color: 0x602090 }
          },
          {type: 'line', displayName: 'Respiratory', yField: 'Respiratory', 
            style: { mode: 'stretch', stroke:"#B59", color: 0xB05090 }
          },
          {type: 'line', displayName: 'ILI', yField: 'ILI', 
            style: { mode: 'stretch', stroke:"#522", color: 0x502020 }
          }]
        })
      ]}
    ];
    
    Talho.Epi.RODS.view.Graphs.superclass.initComponent.apply(this, arguments);
    
  },
  
});
