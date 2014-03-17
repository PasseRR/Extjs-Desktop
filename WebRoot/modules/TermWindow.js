/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.modules.TermWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.*',
		'Ext.toolbar.Paging',
		'Ext.PagingToolbar',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'term',

    init : function(){
        this.launcher = {
            text: '学期管理',
            iconCls:'term16x16',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var classWin = desktop.getWindow('grid-win');
        if(!classWin){
			//加载grid数据
			//每页最大记录数
			var sizePerPage = 8;
			Ext.define('Class', {  
				extend:'Ext.data.Model',  
				fields:[
					{name:"classID", mapping:"classID"},
					{name:"classDes", mapping:"classDes"}
				]  
			});  
			var termStore = Ext.create('Ext.data.Store', {
				//model:'Class',  
				fields: ['termID', 'termDes'],
				pageSize: sizePerPage,
				proxy: {
					type: 'ajax',
					url: 'mod/term/getTerm.jsp',
					reader: {
						type: 'json',
						root: 'termList',
						totalProperty: 'total'
					}
				}
			});
			
			//在Store定义里面使用autoLoad会出错
			termStore.load({
				params:{
					start:0,
					limit:sizePerPage
				}
			});
			
            classWin = desktop.createWindow({
                id: 'term',
                title:'学期管理',
                width:420,
                height:300,
                iconCls: 'term16x16',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
				
                items: [{
					loadMask: true, 
                    border: false,
                    xtype: 'grid',
					id: 'termGrid',//指定grid的id，可以通过他获得选中的行来修改和删除
					store:termStore,
                    columns: [
						//new Ext.grid.RowNumberer(),
						{
							text: "学期ID",
							// flex: 1,
							width: 70,
							sortable: true,
							dataIndex: 'termID'
						},
						{
							text: "学期描述",
							flex: 1,
							//width: 70,
							sortable: true,
							dataIndex: 'termDes'
                    }]
                }],
				
                tbar:[{
                    text:'添加',
                    tooltip:'添加新的年级',
                    iconCls:'add',
					handler:function(){
						var formAdd = Ext.create('Ext.form.Panel', {
							id:'form1',
							layout: 'absolute',
							//url: 'save-form.php',//修改密码的页面
							defaultType: 'textfield',
							border: false,

							items: [{
								fieldLabel: '学期描述',
								fieldWidth: 20,
								id:'termDesAdd',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 15,
								name: 'termDesAdd',
								anchor: '-5'  // anchor width by percentage
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '添加',
								handler: function(){
									if(formAdd.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/term/addTerm.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'termDesAdd': Ext.getCmp('termDesAdd').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												//Ext.Msg.alert('return', resp.responseText);
												//var respText = resp.responseText;
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '添加学期成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '添加的学期已存在!');
												}else{//if(respText.success == 'exception'){//exception
													Ext.Msg.alert('异常', '添加学期数据库出现异常!');
												}
												//重新加载数据
												termStore.loadPage(1);
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
							title: '学期添加',
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
						var row = Ext.getCmp("termGrid").getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var editID = row.get("termID");
						var editDes = row.get("termDes");
						//Ext.Msg.alert("msg", editID+" "+editDes);
						var editForm = Ext.create('Ext.form.Panel', {
							id:'editForm',
							layout: 'absolute',
							defaultType: 'textfield',
							border: false,

							items: [{
								fieldLabel: '学期ID',
								fieldWidth: 20,
								id:'termIDEdit',
								readOnly:true,
								xtype:'field',  
								x: 5,
								y: 5,
								value: editID,
								name: 'termIDEdit',
								anchor: '-5'
							},{
								fieldLabel: '学期描述',
								fieldWidth: 20,
								id:'termDesEdit',
								xtype:'field',  
								allowBlank:false,
								blankText:'不能为空',
								x: 5,
								y: 30,
								value: editDes,
								name: 'termDesEdit',
								anchor: '-5' 
							}],
							buttonAlign:'center',  //设置button位置
							buttons: [{
								text: '修改',
								handler: function(){
									if(editForm.form.isValid()){
									    //Ext.Msg.alert("班级描述", Ext.getCmp('classDesAdd').getValue());
										Ext.Ajax.request({
											url : 'mod/term/editTerm.jsp',         
											method : 'POST',       
											// 如果有表单以外的其它参数，可以加在这里。我这里暂时为空，也可以将下面这句省略           
											params : {
												'termIDEdit': Ext.getCmp('termIDEdit').getValue(),
												'termDesEdit': Ext.getCmp('termDesEdit').getValue()
											},      
											success:function(resp, action){
												var respText = Ext.JSON.decode(resp.responseText);
												Ext.Msg.alert('respText', respText.success);
												if(respText.success == true){
													Ext.Msg.alert('成功', '修改学期成功!');
												}else if(respText.success == false){
													Ext.Msg.alert('错误', '修改的学期已存在!');
												}else{
													Ext.Msg.alert('异常', '修改学期数据库出现异常!');
												}
												
												//重新加载数据
												termStore.loadPage(1);
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
						var row = Ext.getCmp('termGrid').getSelectionModel().getLastSelected();
						if(!row){
							Ext.Msg.alert('提示', '没有选中行!');
							return;
						}
						var deleteID = row.get('termID');
						Ext.Msg.confirm('删除', '确定要删除该条记录吗?', 
						function(btn){
							if(btn == 'yes'){
								//执行删除
								Ext.Ajax.request({
									url : 'mod/term/deleteTerm.jsp',         
									method : 'POST',                
										params : {
										'deleteID': deleteID
									},      
									success:function(resp, action){
										var respText = Ext.JSON.decode(resp.responseText);
										Ext.Msg.alert('respText', respText.success);
										if(respText.success == true){
											Ext.Msg.alert('成功', '删除学期成功!');
										}else if(respText.success == false){
											Ext.Msg.alert('错误', '删除学期数据库出错!');
										}
													
										//重新加载数据
										termStore.loadPage(1);
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
					store:termStore,  
					displayInfo: true,  
					displayMsg: '显示第<font color=blue>{0}</font> - <font color=blue>{1}</font>条 共<font color=blue>{2}</font>条',  
					emptyMsg: "<font color=red>无记录</font>"
				})
            });
        }
        classWin.show();
		
        return classWin;
    }
});


