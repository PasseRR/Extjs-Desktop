/**
 *	成绩统计模块
 *  对学生各科成绩的统计
 *  2013-07-02 by xiehai
 */
Ext.define('Desktop.modules.StatisticsWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.chart.*',
		'Ext.Window', 
		'Ext.layout.container.Fit', 
		'Ext.util.Format',
		'Ext.data.Store',
		'Ext.fx.target.Sprite'
    ],

    id:'statistics',

    init : function(){
        this.launcher = {
            text: '成绩统计',
            iconCls:'chart16x16',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
		var desktop = this.app.getDesktop();
        var win = desktop.getWindow('statistics');
		var store1 = Ext.create('Ext.data.Store', {
				fields: ['studentID', 'studentName'],
				proxy: {
					type: 'ajax',
					url: 'mod/student/getStudent.jsp',
					reader: {
						type: 'json',
						root: 'studentList',
						totalProperty: 'total'
					}
				}
		});
		store1.load({
				params:{
					start:0,
					limit:25
				}
			});
        if(!win){
			var classStore = Ext.create('Ext.data.JsonStore', {
				fields : ['classDes', 'classID'],
				proxy: {
					type: 'ajax',
					url: 'mod/class/getClassList.jsp',
					reader: {
						type: 'json',
						root: 'classList'
					}
				},
				autoLoad:true
			});
			var win = desktop.createWindow({
				id:'statistics',
				width: 800,
				height: 600,
				title: '成绩统计',
				iconCls:'chart16x16',
				animCollapse:false,
                constrainHeader:true,
                layout: 'fit',				
				tbar: [{
					id: 'chooseClass',
					name:'chooseClass',
					xtype:'combo',
					fieldLabel: '所在班级',
					labelWidth: 60,//文本宽度
					width: 200,//框的宽度
					editable : false,
					modal:true,
					store : classStore,
					valueField : 'classID',
					displayField : 'classDes',
					selectOnFocus : true,
					triggerAction : 'all',
					mode : 'remote',
					
					listeners:{
						'select':function(combo, record, index){
							//每当选择一个班级时执行代码
							//传递scoreStore参数 1中方式
							//var classID = Ext.getCmp('chooseClass').getValue();
							//scoreStore.setBaseParam('chooseClass', combo.value);
							//通过班级传递重新加载 传递一个新的班级ID
							Ext.apply(scoreStore.proxy.extraParams, {
								'chooseClass' : combo.value
							});
							scoreStore.loadPage(1);
						}
					}
				}],
				items: {
					id: 'chartCmp',
					xtype: 'chart',
					style: 'background:#fff',
					animate: true,
					shadow: true,
					store: store1,
					axes: [{
						type: 'Numeric',
						position: 'left',
						fields: ['studentID'],
						label: {
							renderer: Ext.util.Format.numberRenderer('0,0')
						},
						title: '分数',
						grid: true,
						minimum: 0
					}, {
						type: 'Category',
						position: 'bottom',
						fields: ['studentName'],
						title: '考试时间'
					}],
					series: [{
						type: 'column',
						axis: 'left',
						highlight: true,
						tips: {
						  trackMouse: true,
						  width: 140,
						  height: 28,
						  renderer: function(storeItem, item) {
							//this.setTitle(storeItem.get('studentName') + ': ' + storeItem.get('studentID') + ' $');
							this.setTitle('要换成其他就是重新加载个store就行了');
						  }
						},
						label: {
						  display: 'insideEnd',
						  'text-anchor': 'middle',
							field: 'data1',
							renderer: Ext.util.Format.numberRenderer('0'),
							orientation: 'vertical',
							color: '#333'
						},
						xField: 'studentName',
						yField: 'studentID'
					}]
				}
			});
		}
		win.show();
		
        return win;
	}
});