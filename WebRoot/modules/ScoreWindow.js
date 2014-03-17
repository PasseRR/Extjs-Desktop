/**
 *	学生成绩管理模块
 *  2013-07-02 by xiehai
 */
Ext.define('Desktop.modules.ScoreWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.*',
		'Ext.toolbar.Paging',
		'Ext.PagingToolbar',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'score',

    init : function(){
        this.launcher = {
            text: '成绩管理',
            iconCls:'score16x16',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('score');
        if(!win){
			//加载grid数据
			//每页最大记录数
			var sizePerPage = 10; 
			//成绩
			var scoreStore = Ext.create('Ext.data.Store', {
				fields: ['scoreID', 'classID', 'studentID', 'subjectID', 'termID', 'scoreNum'],
				pageSize: sizePerPage,
				proxy: {
					type: 'ajax',
					url: 'mod/score/getScore.jsp',
					//baseParams无效
					extraParams:{
						chooseClass:0
					},
					reader: {
						type: 'json',
						root: 'scoreList',
						totalProperty: 'total'
					}
				}
			});
			
			//在Store定义里面使用autoLoad会出错
			scoreStore.load({
				params:{
					start:0,
					limit:sizePerPage					
				}
			});
			
			//选择的班级,会影响成绩的集合,通过班级查询
			var chooseClassStore = Ext.create('Ext.data.JsonStore', {
				fields : ['classDes', 'classID'],
				proxy: {
					type: 'ajax',
					url: 'mod/class/getClassList.jsp',
					reader: {
						type: 'json',
						root: 'classList'
					}
				},
				listeners:{
					'load':function(){
						var row = Ext.getCmp("scoreGrid").getSelectionModel().getLastSelected();
						var val;
						if(row){
							val = row.get('classID');
						}
						var tval = Ext.getCmp("chooseClass").getValue();
						if(val && val == tval){
							Ext.getCmp('classIDEdit').setValue(val);
						}
					}
				}
			});
			
			//选择学生
			var studentStore = new Ext.data.JsonStore({
				fields : ['studentID', 'studentName'],
				proxy: {
					type: 'ajax',
					url: 'mod/student/getStudentByClass.jsp',
					timeout: 5000,//5s超时设置
					reader: {
						type: 'json',
						root: 'studentList'
					}
				},
				//autoLoad : true, 
				listeners:{
					//通过监听器判断store是否有数据
					load: function(){
						if(Ext.getCmp('studentIDAdd')){
							if(studentStore.count() == 0){
								Ext.Msg.alert('提示', '该班级下没有学生');
								Ext.getCmp('studentIDAdd').disable();
							}else{
								Ext.getCmp('studentIDAdd').enable();
							}
						}else{
							if(studentStore.count() == 0){
								Ext.Msg.alert('提示', '该班级下没有学生');
								Ext.getCmp('studentIDEdit').disable();
							}else{
								Ext.getCmp('studentIDEdit').enable();
							}
							var val = Ext.getCmp("scoreGrid").getSelectionModel().getLastSelected().get('studentID');
							if(val){
								Ext.getCmp('studentIDEdit').setValue(val);
							}
						}
					}
				}
			}); 
			
			//选择科目
			var subjectStore = new Ext.data.JsonStore({
				fields : ['subjectID', 'subjectDes'],
				proxy: {
					type: 'ajax',
					url: 'mod/subject/getAllSubject.jsp',
					reader: {
						type: 'json',
						root: 'subjectList'
					}
				},
				listeners:{
					'load':function(){
						var row = Ext.getCmp("scoreGrid").getSelectionModel().getLastSelected();
						if(row){
							var val = row.get('subjectID');
							if(val){
								Ext.getCmp('subjectIDEdit').setValue(val);
							}
						}
					}
				}
			});
			
			//选择学期
			var termStore = new Ext.data.JsonStore({
				fields : ['termID', 'termDes'],
				proxy: {
					type: 'ajax',
					url: 'mod/term/getAllTerm.jsp',
					reader: {
						type: 'json',
						root: 'termList'
					}
				},
				listeners:{
					'load':function(){
						var row = Ext.getCmp("scoreGrid").getSelectionModel().getLastSelected();
						if(row){
							var val = row.get('termID');
							if(val){
								Ext.getCmp('termIDEdit').setValue(val);
							}
						}
					}
				}
			});
			
            win = desktop.createWindow({
                id: 'score',
                title:'成绩管理',
                width:420,
                height:335,
                iconCls: 'score16x16',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
				
                items: [{
					loadMask: true, 
                    border: false,
                    xtype: 'grid',
					id: 'scoreGrid',//指定grid的id，可以通过他获得选中的行来修改和删除
					store:scoreStore,
                    columns: [
						//new Ext.grid.RowNumberer(),
						{
							text: "成绩ID",
							// flex: 1,
							width: 60,
							sortable: true,
							dataIndex: 'scoreID'
						},
						{
							text: "班级ID",
							//flex: 1,
							width: 60,
							sortable: true,
							dataIndex: 'classID'
						},
						{
							text: "学生ID",
							//flex: 1,
							width: 60,
							sortable: true,
							dataIndex: 'studentID'
						},
						{
							text: "学期ID",
							//flex: 1,
							width: 60,
							sortable: true,
							dataIndex: 'termID'
						},
						
						{
							text: "科目ID",
							//flex: 1,
							width: 60,
							sortable: true,
							dataIndex: 'subjectID'
						},
						{
							text: "成绩",
							flex: 1,
							//width: 85,
							sortable: true,
							dataIndex: 'scoreNum'
						}
					]
                }],
				
                tbar:[{
                    text:'添加',
                    tooltip:'添加新的成绩',
                    iconCls:'add',
					handler:function(){
						var formAdd = Ext.create('Ext.form.Panel', {
							id:'form1',
							layout: 'absolute',
							//defaultType: 'textfield',
							border: false,

							items: [
							{
								id: 'classIDAdd',
								name:'classIDAdd',
								xtype:'combo',
								fieldLabel: '所在班级',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								editable : false,
								modal:true,
								store : chooseClassStore,
								valueField : 'classID',
								displayField : 'classDes',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x: 5,
								y: 5,				
								listeners:{
									'select':function(combo, record, index){
										Ext.getCmp('studentIDAdd').clearValue();
										studentStore.removeAll();
										Ext.apply(studentStore.proxy.extraParams, {
											'studentClass' : combo.value
										});
										studentStore.load();
									}
								}
							},{
								id: 'studentIDAdd',
								name:'studentIDAdd',
								xtype:'combo',
								fieldLabel: '学生',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
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
								mode : 'remote',
								x: 5,
								y: 30
							},{
								id: 'subjectIDAdd',
								name:'subjectIDAdd',
								xtype:'combo',
								fieldLabel: '科目',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								editable : false,
								modal:true,
								store : subjectStore,
								valueField : 'subjectID',
								displayField : 'subjectDes',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x:5, 
								y:55
							},{
								id: 'termIDAdd',
								name:'termIDAdd',
								xtype:'combo',
								fieldLabel: '学期',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								editable : false,
								modal:true,
								store : termStore,
								valueField : 'termID',
								displayField : 'termDes',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x:5, 
								y:80
							},{
								xtype: "textfield",
								fieldLabel: '分数',
								fieldWidth: 20,
								id:'scoreNumAdd',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 105,
								name: 'scoreNumAdd',
								anchor: '100%'  // anchor width by percentage
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '添加',
								handler: function(){
									if(formAdd.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/score/addScore.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'classIDAdd': Ext.getCmp('classIDAdd').getValue(),
												'studentIDAdd': Ext.getCmp('studentIDAdd').getValue(),
												'subjectIDAdd': Ext.getCmp('subjectIDAdd').getValue(),
												'scoreNumAdd': Ext.getCmp('scoreNumAdd').getValue(),
												'termIDAdd': Ext.getCmp('termIDAdd').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												//Ext.Msg.alert('return', resp.responseText);
												//var respText = resp.responseText;
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '添加成绩成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '添加的成绩已存在!');
												}else{//if(respText.success == 'exception'){//exception
													Ext.Msg.alert('异常', '数据库添加成绩出现异常!');
												}
												//重新加载数据
												scoreStore.loadPage(1);
												addWin.close();
											}
										});
									}
								}
							},{
								text: '取消',
								handler: function(){
									addWin.close();
								}
							}]
						});
						var addWin = Ext.create('Ext.window.Window', {
							title: '科目添加',
							width: 265,
							height: 200,
							layout: 'fit',
							plain:true,
							items: formAdd
						});

						addWin.show();
					}
                }, '-', {
                    text:'编辑',
                    tooltip:'修改选中行',
                    iconCls:'option',
					handler:function(){
						var row = Ext.getCmp("scoreGrid").getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var editScoreID = row.get("scoreID");
						var editScoreNum = row.get('scoreNum');
						//Ext.Msg.alert("msg", editID+" "+editDes);
						var editForm = Ext.create('Ext.form.Panel', {
							id:'editForm',
							layout: 'absolute',
							defaultType: 'textfield',
							border: false,

							items: [
							{
								xtype: "textfield",
								fieldLabel: '成绩ID',
								fieldWidth: 20,
								id:'scoreIDEdit',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								readOnly:true,
								value:editScoreID,
								x: 5,
								y: 5,
								name: 'scoreIDEdit',
								anchor: '100%'  // anchor width by percentage
							},
							{
								id: 'classIDEdit',
								name:'classIDEdit',
								xtype:'combo',
								fieldLabel: '所在班级',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								editable : false,
								modal:true,
								store : chooseClassStore,
								valueField : 'classID',
								displayField : 'classDes',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x: 5,
								y: 30,				
								listeners:{
									'select':function(combo, record, index){
										Ext.getCmp('studentIDEdit').clearValue();
										studentStore.removeAll();
										Ext.apply(studentStore.proxy.extraParams, {
											'studentClass' : combo.value
										});
										studentStore.load();
									}
								}
							},{
								id: 'studentIDEdit',
								name:'studentIDEdit',
								xtype:'combo',
								fieldLabel: '学生',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								listConfig: {
									loadMask: false
								}, 
								editable : false,
								modal:true,
								store : studentStore,
								valueField : 'studentID',
								displayField : 'studentName',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x: 5,
								y: 55
							},{
								id: 'subjectIDEdit',
								name:'subjectIDEdit',
								xtype:'combo',
								fieldLabel: '科目',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								editable : false,
								modal:true,
								store : subjectStore,
								valueField : 'subjectID',
								displayField : 'subjectDes',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x:5, 
								y:80
							},{
								id: 'termIDEdit',
								name:'termIDEdit',
								xtype:'combo',
								fieldLabel: '学期',
								//labelWidth: 60,//文本宽度
								width: 231,//框的宽度
								editable : false,
								modal:true,
								store : termStore,
								valueField : 'termID',
								displayField : 'termDes',
								selectOnFocus : true,
								triggerAction : 'all',
								mode : 'remote',
								x:5, 
								y:105
							},{
								xtype: "textfield",
								fieldLabel: '分数',
								fieldWidth: 20,
								id:'scoreNumEdit',
								xtype:'field',  
								allowBlank:false,
								value:editScoreNum,
								blankText:'不能为空',
								x: 5,
								y: 130,
								name: 'scoreNumEdit'
								//anchor: '100%'  // anchor width by percentage
							}
							],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '修改',
								handler: function(){
									if(editForm.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/score/editScore.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'scoreIDEdit': Ext.getCmp('scoreIDEdit').getValue(),
												'classIDEdit': Ext.getCmp('classIDEdit').getValue(),
												'studentIDEdit': Ext.getCmp('studentIDEdit').getValue(),
												'termIDEdit': Ext.getCmp('termIDEdit').getValue(),
												'subjectIDEdit': Ext.getCmp('subjectIDEdit').getValue(),
												'scoreNumEdit': Ext.getCmp('scoreNumEdit').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '修改成绩成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '修改的成绩已存在!');
												}else{
													Ext.Msg.alert('异常', '数据库修改出错!');
												}
												
												//重新加载数据
												scoreStore.loadPage(1);
												editWin.close();
											}
										});
									}
								}
							},{
								text: '取消',
								handler: function(){
									editWin.close();
								}
							}]
						});
						var editWin = Ext.create('Ext.window.Window', {
							title: '科目修改',
							width: 265,
							height: 240,
							layout: 'fit',
							plain:true,
							items: editForm
						});

						editWin.show();
					}
                },'-',{
                    text:'删除',
                    tooltip:'删除选中行',
                    iconCls:'remove',
					handler:function(){
						//选中行
						var row = Ext.getCmp('scoreGrid').getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var deleteID = row.get('scoreID');
						Ext.Msg.confirm('删除', '确定要删除该条记录吗?', 
						function(btn){
							if(btn == 'yes'){
								//执行删除
								Ext.Ajax.request({
									url : 'mod/score/deleteScore.jsp',         
									method : 'POST',                
										params : {
										'scoreIDDelete': deleteID
									},      
									success:function(resp, action){
										var respText = Ext.JSON.decode(resp.responseText);
										Ext.Msg.alert('respText', respText.success);
										if(respText.success == true){
											Ext.Msg.alert('成功', '删除成绩成功!');
										}else if(respText.success == false){
											Ext.Msg.alert('错误', '数据库删除出错!');
										}
													
										//重新加载数据
										scoreStore.loadPage(1);
									}
								});
							}else{
								//do nothing
							}
						},this);
					}
                },'-',{
					id: 'chooseClass',
					name:'chooseClass',
					xtype:'combo',
					fieldLabel: '所在班级',
					labelWidth: 60,//文本宽度
					width: 200,//框的宽度
					editable : false,
					modal:true,
					store : chooseClassStore,
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
				
				bbar: Ext.create('Ext.PagingToolbar',{  
					pageSize:sizePerPage,  
					store:scoreStore,  
					displayInfo: true,  
					displayMsg: '显示第<font color=blue>{0}</font> - <font color=blue>{1}</font>条 共<font color=blue>{2}</font>条',  
					emptyMsg: "<font color=red>无记录</font>"
				})
            });
        }
        win.show();
		
        return win;
    }
});


