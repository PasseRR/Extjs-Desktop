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

Ext.define('Desktop.modules.Notepad', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.form.field.HtmlEditor'
        //'Ext.form.field.TextArea'
    ],

    id:'notepad',

    init : function(){
        this.launcher = {
            text: '记事本',
            iconCls:'notepad16x16',//开始菜单的图标
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('notepad');
        if(!win){
            win = desktop.createWindow({
                id: 'notepad',
                title:'记事本',
                width:600,
                height:400,
                iconCls: 'notepad16x16',//窗体中的图标
                animCollapse:false,
                border: false,
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                hideMode: 'offsets',

                layout: 'fit',
                items: [
                    {
                        xtype: 'htmleditor',
                        //xtype: 'textarea',
                        id: 'notepad-editor'
						//value:
                    }
                ],
				listeners:{
					'hide':function(a, b){
						//hide htmleditor的时候保存记事本的内容
						//Ext.Msg.alert("提示", '已保存记事本!');
						Ext.Ajax.request({
							url: 'mod/notepad/saveNotepad.jsp',
							method: 'POST',
							params:{
								'notepad':Ext.getCmp('notepad-editor').getValue()
							},
							success:function(resp, action){
								var respText = Ext.JSON.decode(resp.responseText);
								if(respText.success == true){
									Ext.Msg.alert('成功', '保存记事本成功!');
								}else if(respText.success == false){
									Ext.Msg.alert('错误', '保存出错!');
								}else{
									Ext.Msg.alert('异常', '数据库保存出异常!');
								}
							}
						});
					},
					'show':function(a, b){
						Ext.Ajax.request({
							url:"mod/notepad/getNotepad.jsp",
							success:function(resp, action){
								var respText = Ext.JSON.decode(resp.responseText);
								if(respText.success == true){
									//Ext.Msg.alert('提示', respText.notepad);
									//从数据库提取一条数据
									Ext.getCmp('notepad-editor').setValue(respText.notepad);
								}else{
									Ext.Msg.alert('异常', '加载记事本内容出错!');
									Ext.getCmp('notepad-editor').setValue('');
								}
							}
						});
					}
				}
            });
        }
        win.show();
        return win;
    }
});

