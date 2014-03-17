/**
 *	学生管理模块
 *  对学生信息的管理
 *  2013-07-02 by xiehai
 */
Ext.define('Desktop.modules.StudentWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.*',
		'Ext.toolbar.Paging',
		'Ext.PagingToolbar',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'student',

    init : function(){
        this.launcher = {
            text: '学生管理',
            iconCls:'student16x16',
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
			var ds = Ext.create('Ext.data.Store', {
				fields: ['studentID', 'classID', 'studentName', 'studentSex'],
				pageSize: sizePerPage,
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
			
			//在Store定义里面使用autoLoad会出错
			ds.load({
				params:{
					start:0,
					limit:sizePerPage
				}
			});
			
            win = desktop.createWindow({
                id: 'student',
                title:'学生管理',
                width:420,
                height:335,
                iconCls: 'student16x16',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
				
                items: [{
					loadMask: true, 
                    border: false,
                    xtype: 'grid',
					id: 'studentGrid',//指定grid的id，可以通过他获得选中的行来修改和删除
					store:ds,
                    columns: [
						//new Ext.grid.RowNumberer(),
						{
							text: "学生ID",
							// flex: 1,
							width: 85,
							sortable: true,
							dataIndex: 'studentID'
						},
						{
							text: "年级ID",
							// flex: 1,
							width: 85,
							sortable: true,
							dataIndex: 'classID'
						},
						{
							text: "学生性别",
							//flex: 1,
							width: 85,
							sortable: true,
							dataIndex: 'studentSex'
						},
						{
							flex: 1,
							text: "学生名字",
							sortable:true,
							dataIndex: 'studentName'
						}
					]
                }],
				
                tbar:[{
                    text:'添加',
                    tooltip:'添加新的学生',
                    iconCls:'add',
					handler:function(){
						var formAdd = Ext.create('Ext.form.Panel', {
							id:'form1',
							layout: 'absolute',
							//defaultType: 'textfield',
							border: false,

							items: [{
								xtype : "combo",
								id : "classIDAdd",
								name : "classIDAdd",
								fieldLabel : "班级",
								editable : false,
								modal:true,
								store : new Ext.data.JsonStore({
									//url : 'mod/class/getClassList.jsp',
                                    //root : "classList",
                                    //remoteSort : true,
									fields : ['classDes', 'classID'],
									proxy: {
										type: 'ajax',
										url: 'mod/class/getClassList.jsp',
										reader: {
											type: 'json',
											root: 'classList'
										}
									}
								}),
								valueField : 'classID',
								displayField : 'classDes',
								mode : 'remote',
								anchor : '100%',
								listWidth: 105,
								width:90,
								x: 5,
								y: 5
							},{
								xtype : "combo",
								id : "studentSexAdd",
								name : "studentSexAdd",
								fieldLabel : "性别",
								triggerAction : "all",
								anchor : '100%',
								editable : false,
								store : new Ext.data.SimpleStore({
									fields : ['value', 'studentSex'],
									data : [['男', '男'],
									  ['女', '女']]
								}),
								valueField : 'studentSex',
								displayField : 'value',
								mode : 'local',
								lazyRender : true,
								typeAhead : true,
								fieldWidth: 10,
								//width : 120,
								x: 5,
								y: 30
							},{
								xtype: "textfield",
								fieldLabel: '名字',
								fieldWidth: 20,
								id:'studentNameAdd',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 55,
								name: 'studentNameAdd',
								anchor: '-5'  // anchor width by percentage
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '添加',
								handler: function(){
									if(formAdd.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/student/addStudent.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'classIDAdd': Ext.getCmp('classIDAdd').getValue(),
												'studentSexAdd':Ext.getCmp('studentSexAdd').getValue(),
												'studentNameAdd':Ext.getCmp('studentNameAdd').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												//Ext.Msg.alert('return', resp.responseText);
												//var respText = resp.responseText;
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '添加学生成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '添加的学生已存在!');
												}else{//if(respText.success == 'exception'){//exception
													Ext.Msg.alert('异常', '添加学生出现异常!');
												}
												//重新加载数据
												ds.loadPage(1);
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
							title: '学生添加',
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
						var row = Ext.getCmp("studentGrid").getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var editStudentID = row.get("studentID");
						var editClassID = row.get("classID");
						var editStudentSex = row.get("studentSex");
						var editStudentName = row.get("studentName");
						//Ext.Msg.alert("msg", editID+" "+editDes);
						var editForm = Ext.create('Ext.form.Panel', {
							id:'editForm',
							layout: 'absolute',
							defaultType: 'textfield',
							border: false,

							items: [{								
								fieldLabel: '学生ID',
								fieldWidth: 20,
								id:'editStudentID',
								readOnly:true,
								xtype:'field',  
								x: 5,
								y: 5,
								value: editStudentID,
								name: 'editStudentID',
								anchor: '-5'
							},{
								xtype : "combo",
								id : "editClassID",
								name : "editClassID",
								fieldLabel : "班级",
								editable : false,
								modal:true,
								store : new Ext.data.JsonStore({
									//url : 'mod/class/getClassList.jsp',
                                    //root : "classList",
                                    //remoteSort : true,
									fields : ['classDes', 'classID'],
									proxy: {
										type: 'ajax',
										url: 'mod/class/getClassList.jsp',
										reader: {
											type: 'json',
											root: 'classList'
										}
									},
									autoLoad : true,
									listeners:{
										//通过监听器获得关联的班级
										load: function(){
											Ext.getCmp('editClassID').setValue(editClassID);
										}
									}
								}),
								valueField : 'classID',
								displayField : 'classDes',
								//value:editClassID,
								mode : 'remote',
								anchor : '100%',
								listWidth: 105,
								width:90,
								x: 5,
								y: 30	
							},{
								xtype : "combo",
								id : "editStudentSex",
								name : "editStudentSex",
								fieldLabel : "性别",
								triggerAction : "all",
								anchor : '100%',
								editable : false,
								store : new Ext.data.SimpleStore({
									fields : ['value', 'studentSex'],
									data : [['男', '男'],
									  ['女', '女']]
								}),
								valueField : 'studentSex',
								displayField : 'value',
								value: editStudentSex,
								mode : 'local',
								lazyRender : true,
								typeAhead : true,
								fieldWidth: 10,
								width : 40,
								x: 5,
								y: 55
							},{
								fieldLabel: '姓名',
								fieldWidth: 20,
								id:'editStudentName',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 80,
								value: editStudentName,
								name: 'editStudentName',
								anchor: '-5' 
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '修改',
								handler: function(){
									if(editForm.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/student/editStudent.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'editStudentID': Ext.getCmp('editStudentID').getValue(),
												'editClassID': Ext.getCmp('editClassID').getValue(),
												'editStudentSex': Ext.getCmp('editStudentSex').getValue(),
												'editStudentName': Ext.getCmp('editStudentName').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '修改学生成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '修改的学生已存在!');
												}else{
													Ext.Msg.alert('异常', '数据库修改出错!');
												}
												
												//重新加载数据
												ds.loadPage(1);
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
							title: '年级修改',
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
						var row = Ext.getCmp('studentGrid').getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var deleteID = row.get('studentID');
						Ext.Msg.confirm('删除', '确定要删除该条记录吗?', 
						function(btn){
							if(btn == 'yes'){
								//执行删除
								Ext.Ajax.request({
									url : 'mod/student/deleteStudent.jsp',         
									method : 'POST',                
										params : {
										'studentIDDelete': deleteID
									},      
									success:function(resp, action){
										var respText = Ext.JSON.decode(resp.responseText);
										Ext.Msg.alert('respText', respText.success);
										if(respText.success == true){
											Ext.Msg.alert('成功', '删除学生成功!');
										}else if(respText.success == false){
											Ext.Msg.alert('错误', '数据库删除出错!');
										}
													
										//重新加载数据
										ds.loadPage(1);
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
					store:ds,  
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


