<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ExtTop - Desktop Sample App</title>

    <link rel="stylesheet" type="text/css" href="css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="css/desktop.css" />

    <script type="text/javascript" src="ext/ext-all.js"></script>
	<script type="text/javascript" src="ext/bootstrap.js"></script>
	<script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>
	
	<script type="text/javascript" src="js/Module.js"></script> 
    <script type="text/javascript" src="js/Video.js"></script> 
    <script type="text/javascript" src="js/Wallpaper.js"></script> 
    <script type="text/javascript" src="js/FitAllLayout.js"></script> 
    <script type="text/javascript" src="js/StartMenu.js"></script> 
    <script type="text/javascript" src="js/TaskBar.js"></script> 
    <script type="text/javascript" src="js/ShortcutModel.js"></script>   
    <script type="text/javascript" src="js/Desktop.js"></script> 
    <script type="text/javascript" src="js/App.js"></script> 

	
	<!-- modules -->
	<script type="text/javascript" src="modules/WallpaperModel.js"></script> 
    <script type="text/javascript" src="modules/VideoWindow.js"></script> 
    <script type="text/javascript" src="modules/BogusModule.js"></script> 
    <script type="text/javascript" src="modules/BogusMenuModule.js"></script> 
    <script type="text/javascript" src="modules/TabWindow.js"></script> 
    <script type="text/javascript" src="modules/GridWindow.js"></script> 
    <script type="text/javascript" src="modules/AccordionWindow.js"></script> 
    <script type="text/javascript" src="modules/SystemStatus.js"></script> 
    <script type="text/javascript" src="modules/Notepad.js"></script> 
	
	<!-- config -->
	<script type="text/javascript" src="Settings.js"></script> 
	<script type="text/javascript" src="App.js"></script>
    <script type="text/javascript">
        Ext.Loader.setPath({
            'Ext.ux.desktop': 'js',
            MyDesktop: ''
        });

        Ext.require('MyDesktop.App');
		//通过session直接获取用户名
		var useName = '李四';
        var myDesktopApp;
        Ext.onReady(function () {
            myDesktopApp = new MyDesktop.App();
        });
    </script>
</head>

<body>

    <a href="http://www.sencha.com" target="_blank" alt="Powered by Ext JS"
       id="poweredby"><div></div></a>

</body>
</html>