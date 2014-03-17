/**
 *	科目管理模块
 *  2013-07-02 by xiehai
 */
Ext.define('Desktop.modules.SubjectWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.*',
		'Ext.toolbar.Paging',
		'Ext.PagingToolbar',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'subject',

    init : function(){
        this.launcher = {
            text: '科目管理',
            iconCls:'subject16x16',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('student');
        if(!win){
			//加载grid数据
			//每页最大记录数
			var sizePerPage = 10; 
			var subjectStore = Ext.create('Ext.data.Store', {
				fields: ['subjectID', 'subjectDes'],
				pageSize: sizePerPage,
				proxy: {
					type: 'ajax',
					url: 'mod/subject/getSubject.jsp',
					reader: {
						type: 'json',
						root: 'subjectList',
						totalProperty: 'total'
					}
				}
			});
			
			//在Store定义里面使用autoLoad会出错
			subjectStore.load({
				params:{
					start:0,
					limit:sizePerPage
				}
			});
			
            win = desktop.createWindow({
                id: 'subject',
                title:'科目管理',
                width:420,
                height:335,
                iconCls: 'subject16x16',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
				
                items: [{
					loadMask: true, 
                    border: false,
                    xtype: 'grid',
					id: 'subjectGrid',//指定grid的id，可以通过他获得选中的行来修改和删除
					store:subjectStore,
                    columns: [
						//new Ext.grid.RowNumberer(),
						{
							text: "科目ID",
							// flex: 1,
							width: 85,
							sortable: true,
							dataIndex: 'subjectID'
						},
						{
							text: "科目描述",
							flex: 1,
							//width: 85,
							sortable: true,
							dataIndex: 'subjectDes'
						}
					]
                }],
				
                tbar:[{
                    text:'添加',
                    tooltip:'添加新的科目',
                    iconCls:'add',
					handler:function(){
						var formAdd = Ext.create('Ext.form.Panel', {
							id:'form1',
							layout: 'absolute',
							//defaultType: 'textfield',
							border: false,

							items: [{
								xtype: "textfield",
								fieldLabel: '科目描述',
								fieldWidth: 20,
								id:'subjectDesAdd',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 15,
								name: 'subjectDesAdd',
								anchor: '-5'  // anchor width by percentage
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '添加',
								handler: function(){
									if(formAdd.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/subject/addSubject.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'subjectDesAdd': Ext.getCmp('subjectDesAdd').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												//Ext.Msg.alert('return', resp.responseText);
												//var respText = resp.responseText;
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '添加科目成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '添加的科目已存在!');
												}else{//if(respText.success == 'exception'){//exception
													Ext.Msg.alert('异常', '数据库添加科目出现异常!');
												}
												//重新加载数据
												subjectStore.loadPage(1);
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
							height: 150,
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
						var row = Ext.getCmp("subjectGrid").getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var editSubjectID = row.get("subjectID");
						var editSubjectDes = row.get("subjectDes");
						//Ext.Msg.alert("msg", editID+" "+editDes);
						var editForm = Ext.create('Ext.form.Panel', {
							id:'editForm',
							layout: 'absolute',
							defaultType: 'textfield',
							border: false,

							items: [{								
								fieldLabel: '科目ID',
								fieldWidth: 20,
								id:'editSubjectID',
								readOnly:true,
								xtype:'field',  
								x: 5,
								y: 5,
								value: editSubjectID,
								name: 'editSubjectID',
								anchor: '-5'
							},{
								fieldLabel: '科目描述',
								fieldWidth: 20,
								id:'editSubjectDes',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 35,
								value: editSubjectDes,
								name: 'editSubjectDes',
								anchor: '-5' 
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '修改',
								handler: function(){
									if(editForm.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/subject/editSubject.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'editSubjectID': Ext.getCmp('editSubjectID').getValue(),
												'editSubjectDes': Ext.getCmp('editSubjectDes').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '修改科目成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '修改的科目已存在!');
												}else{
													Ext.Msg.alert('异常', '数据库修改出错!');
												}
												
												//重新加载数据
												subjectStore.loadPage(1);
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
							height: 180,
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
						var row = Ext.getCmp('subjectGrid').getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var deleteSubjectID = row.get('subjectID');
						Ext.Msg.confirm('删除', '确定要删除该条记录吗?', 
						function(btn){
							if(btn == 'yes'){
								//执行删除
								Ext.Ajax.request({
									url : 'mod/subject/deleteSubject.jsp',         
									method : 'POST',                
										params : {
										'deleteSubjectID': deleteSubjectID
									},      
									success:function(resp, action){
										var respText = Ext.JSON.decode(resp.responseText);
										Ext.Msg.alert('respText', respText.success);
										if(respText.success == true){
											Ext.Msg.alert('成功', '删除科目成功!');
										}else if(respText.success == false){
											Ext.Msg.alert('错误', '数据库删除出错!');
										}
													
										//重新加载数据
										subjectStore.loadPage(1);
									}
								});
							}else{
								//do nothing
							}
						},this);
					}
                }],
				
				bbar: Ext.create('Ext.PagingToolbar',{  
					pageSize:sizePerPage,  
					store:subjectStore,  
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


