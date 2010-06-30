Ext.ns('App');

App.Format = function() {
  return {
  usMoney: function(v) {
      if (v == "NA") {
        return v
      } else {
        v = (Math.round((v-0)*100))/100;
        v = (v == Math.floor(v))? v + ".00": ((v*10 == Math.floor(v*10))? v + "0": v);
        v = String(v);
        var ps = v.split('.'),
        whole = ps[0],
        sub = ps[1]? '.'+ ps[1]: '.00',
        r = /(\d+)(\d{3})/;
        while (r.test(whole)) {
          whole = whole.replace(r, '$1' + ',' + '$2');
        }
        v = whole + sub;
        if(v.charAt(0) == '-') {
          return '-$' + v.substr(1);
        }
        return "$" + whole;
      }
    },
  pctChange: function(v) {
      k = v * 100;
      v = k.toFixed(1);
      return "<span>" + v + "%</span>";
    }
  }
}();

App.compareStore = Ext.extend(Ext.data.JsonStore, {
    constructor: function() {
        App.compareStore.superclass.constructor.call(this, {
            storeId: 'cmpStore',
            proxy: new Ext.data.HttpProxy({url:'/guides/home/index.php/ajaxy', method:'POST'}),
            root: 'results',           
            remoteSort: true,
            sortInfo: {
                field: 'premium',
                direction: 'ASC'
            },          
            fields: [            
            {
                name: 'company',
                type: 'string'
            },
            {
                name: 'grpname',
                type: 'string'
            },
            {
                name: 'premium',
                type: 'auto'
            },
            {
                name: 'cr08',
                type: 'float'
            },
            {
                name: 'cr07',
                type: 'float'
            },
            {
                name: 'cr06',
                type: 'float'
            },
            {
                name: 'cr05',
                type: 'float'
            },            
            {
                name: 'cr04',
                type: 'float'
            },
            {
                name: 'short',
                type: 'string'
            },
            {
                name: 'phone',
                type: 'string'
            },
            {
                name: 'web',
                type: 'string'
            },
            {
                name: 'ambest',
                type: 'string'
            },
            {
                name: 'ms08',
                type: 'float',
                convert: App.Format.pctChange
            }            
        ]
        });
    }
});

App.CompareGrid = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
        Ext.apply(this, {
            store: new App.compareStore(),
            columns: [{
                header: 'Company',
                id: 'comCol',
                width: 180,
                sortable: false,
                dataIndex: 'company'
            }, {
                header: 'Group',
                id: 'grpCol',
                width: 52,
                sortable: true,
                dataIndex: 'grpname'
            }, {
                header: 'Annual Premium',
                id: 'premCol',
                width: 52,
                sortable: true,
                dataIndex: 'premium',
                align: 'right',
                renderer: App.Format.usMoney
            }],
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function(c, b, r) {								                      
                      Ext.getCmp('contactCont').updateDetail(r.data);
                    }
                }
            }),
            enableHdMenu: false,
            enableColumnMove: false,
            deferRowRender: false,
            stripeRows: true,
            border: false,
            columnLines: true,
            listeners: {
                render: {
                    fn: function() {                        
                        var a = this;
                        this.getStore().on("load", function() {
                            this.getSelectionModel().selectRow(3)
                            }, a)
                        }
                }
            },
            viewConfig: {
                forceFit: true,
                scrollOffset: 1
            }
        });
        App.CompareGrid.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('comparegrid', App.CompareGrid);

App.ContactDetail = Ext.extend(Ext.BoxComponent, {
    tplMarkup: ['<div class="thumb-wrap">',
                '<div class="contactFour">',                
                '</div>',
                '<div class="contactTop">',
                '<p class="contactHead">Company</p><p>{short}</p>',
                '<p class="contactHead">Group</p><p>{grpname}</p>',
                '<p class="contactHead">Phone Number</p><p>{phone}</p>',
                '<p class="contactHead">Web Site</p><p><a class="webLink2" href="http://{web}">{web}</a></p>',
                '<table class="contactTable">',                
                '<tr><td class="left"><p class="contactHead">A.M. Best Rating</p><p>{ambest}</p></td><td><p class="contactHead">Market Share</p><p>{ms08}</p></td></tr>',
                '</table>',
                '</div>',
                '</div>'
                ],
    initComponent: function() {
        this.tpl = new Ext.Template(this.tplMarkup);
        App.ContactDetail.superclass.initComponent.apply(this, arguments);
    },
    updateDetail: function(data) {
        this.update(data);
    }
});
Ext.reg('contactdetail', App.ContactDetail);


App.GridGraph = Ext.extend(Ext.Container, {
  layout: 'vbox',
  height: 675,
  layoutConfig: {
    align: 'stretch',
    pack: 'start'
  },
  defaults: {                    
    border: false
  },
  initComponent: function() {
    this.items = [{
      xtype: 'comparegrid',
      id: 'gridPanel',
      height: 476
    },{
      xtype: 'contactdetail',
      id: 'contactCont',
      flex: 1
    }];
  App.GridGraph.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('gridgraph', App.GridGraph);