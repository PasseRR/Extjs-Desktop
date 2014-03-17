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
 
//不加这段代码可能会报错missing required class
Ext.Loader.setConfig({
	enabled:true
});
Ext.Loader.setPath({
    'Ext.ux.desktop': 'js',            
	'Desktop.modules': 'modules',
	'MyDesktop': ''
});
Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
		'Ext.form.Panel',
        'Ext.ux.desktop.ShortcutModel',		
        'Desktop.modules.SystemStatus',
        'Desktop.modules.VideoWindow',
        'Desktop.modules.GridWindow',
        'Desktop.modules.TabWindow',
        //'Desktop.modules.AccordionWindow',
        'Desktop.modules.Notepad',
        'Desktop.modules.BogusMenuModule',
        'Desktop.modules.BogusModule',
		'Desktop.modules.StudentWindow',
		'Desktop.modules.SubjectWindow',
		'Desktop.modules.ScoreWindow',
		'Desktop.modules.TermWindow',
		'Desktop.modules.StatisticsWindow',
		'Desktop.modules.RadarWindow',
		'Desktop.modules.MusicWindow',
        'MyDesktop.Settings'		
    ],

    init: function() {
        // custom logic before getXYZ methods get called...		
        this.callParent();
		this.desktop.initShortcut();
        // now ready...
    },

    getModules : function(){		
        return [
            new Desktop.modules.VideoWindow(),
            //new MyDesktop.Blockalanche(),
			new Desktop.modules.StudentWindow(),
            new Desktop.modules.SystemStatus(),
            new Desktop.modules.GridWindow(),
            new Desktop.modules.TabWindow(),
            //new Desktop.modules.AccordionWindow(),
            new Desktop.modules.Notepad(),
            new Desktop.modules.BogusMenuModule(),
            new Desktop.modules.BogusModule(),
			new Desktop.modules.ScoreWindow(),
			new Desktop.modules.TermWindow(),
			new Desktop.modules.StatisticsWindow(),
			new Desktop.modules.RadarWindow(),
			new Desktop.modules.MusicWindow(),
			new Desktop.modules.SubjectWindow()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: '更改主题', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: '年级管理', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: '学生管理', iconCls: 'accordion-shortcut', module: 'student' },
                    { name: '科目管理', iconCls: 'subject-shortcut', module: 'subject' },
					{ name: '学期管理', iconCls: 'term-shortcut', module: 'term' },
					{ name: '成绩管理', iconCls: 'score-shortcut', module: 'score' },
					{ name: '成绩统计', iconCls: 'chart-shortcut', module: 'statistics' },
					{ name: '饼图', iconCls: 'cake-shortcut', module: 'notepad' },
					{ name: '雷达图', iconCls: 'line-shortcut', module: 'radar-win' },					
					{ name: '音乐播放器', iconCls: 'music-shortcut', module: 'music' },					
					{ name: '记事本', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: '系统状态', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },
	
    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: useName,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
					{
						text:'密码修改',
						iconCls:'modifyPwd',
						handler:me.modifyPassword,
						scope:me
					},
					'-',
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'注销',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
		    //快速启动栏
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('注销', '确定要注销吗?', 
		function(btn){
			if(btn == 'yes'){
			 	window.close();
			}
		},this);
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    },
	
	//修改密码
	modifyPassword: function(){
	    //vtype 密码验证
		Ext.apply(Ext.form.VTypes, {
			password : function(val, field) {
				if (field.initialPassField) {
					var pwd = Ext.getCmp(field.initialPassField);
					return (val == pwd.getValue());
				}
				return true;
			},
			passwordText : '两次输入的密码不一致'
		});
		var form1 = Ext.create('Ext.form.Panel', {
			id:'form1',
			layout: 'absolute',
			url: 'save-form.php',//修改密码的页面
			defaultType: 'textfield',
			border: false,

			items: [{
				fieldLabel: '当前密码',
				fieldWidth: 20,
				inputType: 'password',
				id:'nowPassword',
				allowBlank:false,
				blankText:'不能为空',
				x: 5,
				y: 5,
				name: 'nowPassword',
				anchor: '-5'  // anchor width by percentage
			}, {
				fieldLabel: '新密码',
				fieldWidth: 20,
				inputType: 'password',
				id:'newPassword',
				allowBlank:false,
				blankText:'不能为空',
				x: 5,
				y: 35,
				name: 'newPassword',
				anchor: '-5'  // anchor width by percentage
			}, {
				fieldLabel: '确认密码',
				fieldWidth: 20,
				allowBlank:false,
				blankText:'不能为空',
				x: 5,
				y: 65,
				inputType: 'password',
				vtype : 'password',
				initialPassField : 'nowPassword',//对密码一致性的验证
				name: 'newCopy',
				id: 'newCopy',
				anchor: '-5'  // anchor width by percentage
			}],
			buttonAlign:'center',  //设置button位置
			buttons: [{
				text: '修改',
				handler:function(){
					/*if(Ext.getCmp('newPassword').getValue() != Ext.getCmp('newCopy').getValue()){
						Ext.Msg.alert('密码输入错误', '两次输入密码不一样');
						return;
					}*/
				    /*if(Ext.get('nowPassword').getValue() == ''){
						Ext.Msg.alert('当前密码不能为空.');
						return;
					}
				    if(Ext.get('newPassword').getValue() != Ext.get('newCopy').getValue()){
						Ext.Msg.alert('两次密码输入不一样');
						return;
					}*/
					/*Ext.Ajax.request({
	　　　　　　　　    url: 'xxx.jsp',
	　　　　　　　　    method: 'POST',
	　　　　　　　　    //jsonData://指定需要发送给服务器端的JSON数据。如果指定了该属性则其它的地方设置的要发送的参数值将无效。
	　　　　　　　　    //xmlData://指定用于发送给服务器的xml文档,如果指定了该属性则其它地方设置的参数将无效。
	　　　　　　　　    params:{
							password: form1.password,
							newPassword: form1.newPassword
						},
	　　　　　　　　    //指定Ajax请求的回调函数，该函数不管是调用成功或失败，都会执行。
	　　　　　　　　    callback: function (options, success, response) {
	　　　　　　　　    	if(success){
	　　　　　　　　　　    	//to-do
	　　　　　　　　　　	}else{

							}
	　　　　　　　　    }
　　　　　        	});*/
				}
			},{
				text: '重置',
				handler:function(){
					form1.form.reset();
				}
			},{
				text: '取消',
				handler:function(){
					win.close();
				}
			}]
		});

		var win = Ext.create('Ext.window.Window', {
			title: '密码修改',
			width: 265,
			height: 200,
			minWidth: 200,
			minHeight: 200,
			layout: 'fit',
			plain:true,
			items: form1
		});

		win.show();
	}
});

