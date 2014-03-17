Ext.define('Desktop.modules.MusicWindow', {
	extend: 'Ext.ux.desktop.Module',
	
	requires: [
        'Ext.form.Panel'
    ],

    id:'music',

    init : function(){
        this.launcher = {
            text: '音乐播放器',
            iconCls:'music16x16',
            handler : this.createWindow,
            scope: this
        };
    },
    
    createWindow : function(){
    	var desktop = this.app.getDesktop();
    	var win = desktop.getWindow('music');
    	if(!win){
    		var musicForm = Ext.create('Ext.form.Panel', {
    			id:'musicForm',
				layout: 'absolute',
				border: false,
				width:890,
				height:590
    		});
    		win = desktop.createWindow({
    			id: 'music',
                title:'音乐播放器',
                width:900,
                height:600,
                iconCls: 'music16x16',//窗体中的图标
                animCollapse:false,
                border: false,
                layout: 'fit',
                items:musicForm
    		});
    		musicForm.update('<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="player.html"></iframe>');
    	}
    	win.show();
    	return win;
    }
});