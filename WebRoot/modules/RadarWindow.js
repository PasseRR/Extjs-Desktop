/**
 *  雷达图示例 以学生成绩为例
 *  2013-07-02 by xiehai
 */
Ext.define('Desktop.modules.RadarWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.chart.*',
		'Ext.Window', 
		'Ext.layout.container.Fit', 
		'Ext.util.Format',
		'Ext.data.JsonStore',
		'Ext.fx.target.Sprite'
    ],

    id:'radar-win',

    init : function(){
        this.launcher = {
            text: '雷达图',
            iconCls:'line16x16',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
		var desktop = this.app.getDesktop();
        var win = desktop.getWindow('radar-win');
		if(!win){
			//班级选择
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
			//学生选择
			var studentStore = Ext.create('Ext.data.JsonStore', {
				fields : ['studentID', 'studentName'],
				proxy: {
					type: 'ajax',
					url: 'mod/student/getStudentByClass.jsp',
					reader: {
						type: 'json',
						root: 'studentList'
					}
				}
			});
			//成绩数据
			var scoreStore = Ext.create('Ext.data.JsonStore', {
				fields : ['termName', 'chineseScore', 'mathScore', 'englishScore'],
				proxy: {
					type: 'ajax',
					url: 'mod/detail/getScoreDetail.jsp',
					reader: {
						type: 'json',
						root: 'scoreDetailList'
					}
				}
			});

			scoreStore.add({
				termName:"2013年上学期"
			},{
				termName:"2013年下学期"
			},{
				termName:"2014年上学期"
			},{
				termName:"2014年下学期"
			},{
				termName:"2015年上学期"
			},{
				termName:"2015年下学期"
			});
			win = desktop.createWindow({
				id:'radar-win',
				width: 800,
				height: 600,
				style: 'overflow: hidden;',
				title: '雷达图',
				iconCls: 'line16x16',
				animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
				tbar: [{
					id: 'chooseClass',
					name:'chooseClass',
					xtype:'combo',
					fieldLabel: '所在班级',
					labelWidth: 60,//文本宽度
					width: 220,//框的宽度
					editable : false,
					modal:true,
					store : classStore,
					valueField : 'classID',
					displayField : 'classDes',
					selectOnFocus : true,
					triggerAction : 'all',
					mode : 'local',
					emptyText:'请选择班级',
					listeners:{
						'select':function(combo, record, index){
							//studentStore.removeAll(false);
							Ext.getCmp('chooseStudent').clearValue();
							studentStore.proxy.url = 'mod/student/getStudentByClass.jsp?studentClass='+combo.value;	
							studentStore.load();
						}
					}
				},'-',{
					id: 'chooseStudent',
					name:'chooseStudent',
					xtype:'combo',
					fieldLabel: '学生名字',
					labelWidth: 60,//文本宽度
					width: 220,//框的宽度
					editable : false,
					modal:true,
					store : studentStore,
					listConfig: {
						loadMask: false
					}, 
					valueField : 'studentID',
					displayField : 'studentName',
					selectOnFocus : true,
					triggerAction : 'all',
					mode : 'local',
					emptyText:'请选择学生',
					listeners:{
						'select':function(combo, record, index){
							scoreStore.removeAll(false);
							scoreStore.proxy.url = 'mod/detail/getScoreDetail.jsp?studentID='+combo.value;
							scoreStore.load();
							Ext.getCmp('chartCmp').drawSeries();
						}
					}
				}],
				items: {
					id: 'chartCmp',
					xtype: 'chart',
					style: 'background:#fff',
					theme: 'Category2',
					animate: true,
					store: scoreStore,
					insetPadding: 20,
					legend: {
						position: 'right'
					},
					axes: [{
						type: 'Radial',
						position: 'radial',
						label: {
							display: true
						}
					}],
					series: [{
						type: 'radar',
						xField: 'termName', //学期
						yField: 'chineseScore',//成绩
						title: '语文',
						showInLegend: true,
						showMarkers: true,
						markerConfig: {
							radius: 5,
							size: 5
						},
						style: {
							'stroke-width': 2,
							fill: 'none'
						},
						renderer: function(storeItem, item) {
							this.setTitle(storeItem.get('chineseScore'));
							//this.setTitle('要换成其他就是重新加载个store就行了');
						}
					},{
						type: 'radar',
						xField: 'termName',
						yField: 'mathScore',
						title: '数学',
						showInLegend: true,
						showMarkers: true,
						markerConfig: {
							radius: 5,
							size: 5
						},
						style: {
							'stroke-width': 2,
							fill: 'none'
						}
					},{
						type: 'radar',
						xField: 'termName',
						yField: 'englishScore',
						title: '英语',
						showMarkers: true,
						showInLegend: true,
						markerConfig: {
							radius: 5,
							size: 5
						},
						style: {
							'stroke-width': 2,
							fill: 'none'
						}
					}]
				}
			}); 
		}
		win.show();
		return win;
	}
});