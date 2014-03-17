// 当前播放歌曲
var CURRENT = -1;
// 监听器
var LISTENER = null;
// 监听时间间隔
var TIMER = 100;
// 播放模式
var MODE = 1;
// 启动播放
var PLAY = false;
// 播放列表
var PLAYLIST = null;
// 历史记录
var RECORD = null;
// 进度条
var PROGRESS = false;
// 音量
var VOLUME = 100;
// 移除歌曲
var REMOVE = -1;
// Ajax
var XmlHttp = null;
// Action
var Action = null;

////////////////////////////////////////////////////////////////
// 播放器界面
Panel = new Object();
Panel.playOnImage = "player/image/play-button-on.gif";
Panel.playHoverImage = "player/image/play-button-hover.gif";
Panel.pauseOnImage = "player/image/pause-button-on.gif";
Panel.pauseHoverImage = "player/image/pause-button-hover.gif";
Panel.stopOnImage = "player/image/stop-button-on.gif";
Panel.stopHoverImage = "player/image/stop-button-hover.gif";
Panel.previousImage = "url(player/image/previous-background.gif) no-repeat";
Panel.nextImage = "url(player/image/next-background.gif) no-repeat";
Panel.selectImage = "url(player/image/select-background.gif) no-repeat";
Panel.tabOnImage = "url(player/image/tab-on-background.gif)";
Panel.tabHoverImage = "url(player/image/tab-hover-background.gif)";
Panel.tabLinkImage = "url(player/image/tab-link-background.gif)";
Panel.volumeAddImage = "player/image/volume-add-button.gif";
Panel.volumeAddHoverImage = "player/image/volume-add-button-hover.gif";
Panel.volumeMinusImage = "player/image/volume-minus-button.gif";
Panel.volumeMinusHoverImage = "player/image/volume-minus-button-hover.gif";
Panel.orderOnImage = "url(player/image/order-button-on.gif) no-repeat";
Panel.orderHoverImage = "url(player/image/order-button-hover.gif) no-repeat";
Panel.randomOnImage = "url(player/image/random-button-on.gif) no-repeat";
Panel.randomHoverImage = "url(player/image/random-button-hover.gif) no-repeat";
Panel.cycleOnImage = "url(player/image/cycle-button-on.gif) no-repeat";
Panel.cycleHoverImage = "url(player/image/cycle-button-hover.gif) no-repeat";

////////////////////////////////////////////////////////////////
// 取得对象
function $(id) {
	return document.getElementById(id);
}
// 去除首尾空字符
String.prototype.trim = function() {
	return this.replace(/(^\s+)|(\s+$)/g, "");
};

////////////////////////////////////////////////////////////////
// 禁用选中文字
$("player-panel").onselectstart = function() {
	return false;
};
// 播放列表的相关事件
$("playlist").onclick = function() {
	this.style.background = Panel.tabOnImage;
	$("playlist-list").style.display = "";
	$("recommend").style.background = Panel.tabLinkImage;
	$("recommend-list").style.display = "none";
};
$("playlist").onmouseover = function() {
	if ($("playlist-list").style.display != "") {
		this.style.background = Panel.tabHoverImage;
	}
};
$("playlist").onmouseout = function() {
	if ($("playlist-list").style.display != "") {
		this.style.background = Panel.tabLinkImage;
	}
};
// 播放列表的滚动条
$("playlist-list").onmouseover = function() {
	this.style.overflowY = "scroll";
};
$("playlist-list").onmouseout = function() {
	this.style.overflowY = "";
};

////////////////////////////////////////////////////////////////
// 新歌推荐的相关事件
$("recommend").onclick = function() {
	$("playlist").style.background = Panel.tabLinkImage;
	$("playlist-list").style.display = "none";
	this.style.background = Panel.tabOnImage;
	$("recommend-list").style.display = "";
};
$("recommend").onmouseover = function() {
	if ($("recommend-list").style.display != "") {
		this.style.background = Panel.tabHoverImage;
	}
};
$("recommend").onmouseout = function() {
	if ($("recommend-list").style.display != "") {
		this.style.background = Panel.tabLinkImage;
	}
};

////////////////////////////////////////////////////////////////
// 播放歌曲的相关事件
$("play").onclick = function() {
	if ($("player").playState == 3) {
		this.src = Panel.playOnImage;
		$("player").controls.pause();
	} else {
		PLAY = true;
		clearInterval(LISTENER);
		LISTENER = setInterval("statusListener()", TIMER);
		this.src = Panel.pauseOnImage;
		$("player").controls.play();
	}
};
$("play").onmouseover = function() {
	if ($("player").playState == 3) {
		this.src = Panel.pauseHoverImage;
	} else {
		this.src = Panel.playHoverImage;
	}
};
$("play").onmouseout = function() {
	if ($("player").playState == 3) {
		this.src = Panel.pauseOnImage;
	} else {
		this.src = Panel.playOnImage;
	}
};
// 停止播放的相关事件
$("stop").onclick = function() {
	PLAY = false;
	$("play").src = Panel.playOnImage;
	$("player").controls.stop();
};
$("stop").onmouseover = function() {
	this.src = Panel.stopHoverImage;
};
$("stop").onmouseout = function() {
	this.src = Panel.stopOnImage;
};

// 上一曲的相关事件
$("previous").onclick = function() {
	playPrevious();
};
$("previous").onmouseover = function() {
	$("select").style.background = Panel.previousImage;
	this.style.color = "#ffffff";
};
$("previous").onmouseout = function() {
	$("select").style.background = Panel.selectImage;
	this.style.color = "#000000";
};
// 下一曲的相关事件
$("next").onclick = function() {
	playNext();
};
$("next").onmouseover = function() {
	$("select").style.background = Panel.nextImage;
	this.style.color = "#ffffff";
};
$("next").onmouseout = function() {
	$("select").style.background = Panel.selectImage;
	this.style.color = "#000000";
};

////////////////////////////////////////////////////////////////
// 调节音量的相关事件
$("volume-minus").onclick = function() {
	addVolume(false);
};
$("volume-minus").onmouseover = function() {
	this.src = Panel.volumeMinusHoverImage;
};
$("volume-minus").onmouseout = function() {
	this.src = Panel.volumeMinusImage;
};
$("volume-add").onclick = function() {
	addVolume(true);
};
$("volume-add").onmouseover = function() {
	this.src = Panel.volumeAddHoverImage;
};
$("volume-add").onmouseout = function() {
	this.src = Panel.volumeAddImage;
};
function addVolume(add) {
	if (add) {
		VOLUME += 5;
		if (VOLUME >= 100) {
			VOLUME = 100;
		}
	} else {
		VOLUME -= 5;
		if (VOLUME <= 0) {
			VOLUME = 0;
		}
	}
	$("player").settings.volume = VOLUME;
	var length = VOLUME / 100 * ($("sound").clientWidth - $("sound-move").clientWidth);
	moveLength("sound", "sound-forword", "sound-move", length);
}

////////////////////////////////////////////////////////////////
// 显示播放时间
function showStatus(info) {
	$("status").innerText = info + PLAYLIST[CURRENT].name;
	var current = "";
	if ($("player").controls.currentPositionString == "") {
		current = "00:00";
	} else {
		current = $("player").controls.currentPositionString;
	}
	if (!PROGRESS) {
		$("current").innerText = current;
	}
	$("total").innerText = $("player").currentMedia.durationString;
	setProgress();
}
// 清除播放时间
function clearStatus() {
	$("current").innerText = "";
	$("total").innerText = "";
	moveLength("progress", "progress-forword", "progress-move", 0);
}

////////////////////////////////////////////////////////////////
// 播放状态监听
function statusListener() {
	switch ($("player").playState) {
		case 1:// 停止播放
			showStatus("停止播放：");
			clearStatus();
			break;
		case 2:// 暂停播放
			showStatus("暂停播放：");
			break;
		case 3:// 正常播放
			showStatus("正在播放：");
			break;
		case 4:// 向前搜索
			break;
		case 5:// 向后搜索
			break;
		case 6:// 缓冲处理
			$("status").innerText = "缓冲处理：" + $("player").network.bufferingProgress + "%";
			break;
		case 7:// 等待反应
			break; 
		case 8:// 播放完毕
			break;
		case 9:// 连接媒体
			$("status").innerText = "连接媒体……";
			clearStatus();
			break;
		case 10:// 准备就绪
			showStatus("准备就绪：");
			clearStatus();
			break;
	}
	
	if (PLAY && $("player").playState == 1) {
		playNext();
	}
}

////////////////////////////////////////////////////////////////
// 读取播放列表
function readPlaylist(id, src) {
	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async = false;
	xmlDoc.load(src);
	var node = xmlDoc.getElementsByTagName("music");
	if (node == null) {
		return;
	}
	
	PLAYLIST = new Array();
	RECORD = new Array();
	var html = "<table>";
	for(var i = 0; i < node.length; i++){
		if (node[i] == null) {
			continue;
		}
		var playlist = new Object();
		playlist.singer = node[i].getElementsByTagName("singer")[0].firstChild.nodeValue;
		playlist.name = node[i].getElementsByTagName("name")[0].firstChild.nodeValue;
		playlist.url = node[i].getElementsByTagName("url")[0].firstChild.nodeValue;
		PLAYLIST[i] = playlist;
	    html += "<tr title=\"" + playlist.singer + " - " + playlist.name + "\"><td ondblclick=\"playCurrent(" + i + ")\">";
	    html += "<input type=\"checkbox\" onfocus=\"this.blur()\"/>";
	    html += (i+1) + " " + playlist.singer + " - " + playlist.name;;
	    html += "</td></tr>";
	}
	html += "</table>";
	$(id).innerHTML = html;
}
readPlaylist("playlist-list", "player/playlist.xml");

////////////////////////////////////////////////////////////////
// 播放状态样式
function setStyle() {
	if ($("playlist-list") == null) {
		return;
	}
	var rows = $("playlist-list").getElementsByTagName("table").item(0).getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].onmouseover = function() {
			this.className = "hover";
		};
		rows[i].onmouseout = function() {
			this.className = "";
		};
	}
}
setStyle();
function playStyle (num) {
	if ($("playlist-list") == null) {
		return;
	}
	var rows = $("playlist-list").getElementsByTagName("table").item(0).getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].style.backgroundColor = (i == num ? "f7ffcd":"");
		rows[i].style.height = (i == num ? "30px":"26px");
		rows[i].style.lineHeight = (i == num ? "30px":"26px");
	}
	// 显示当前播放的歌曲
	var top = $("playlist-list").scrollTop;
	if (top >= num*26){
		$("playlist-list").scrollTop = num*26;
	} else if ((top + 12*26) <= (num + 1)*26) {		
		$("playlist-list").scrollTop = (num - 12)*26 + 30;
	} 
}

////////////////////////////////////////////////////////////////
// 播放历史记录
function playRecord(add) {
	if (add) {
		if (RECORD.length >= 100) {// 保存100个记录
			for (var i = 0; i < RECORD.length - 1; i++) {
				RECORD[i] = RECORD[i + 1];
			}
			RECORD[RECORD.length - 1] = CURRENT;
		} else {
			RECORD[RECORD.length] = CURRENT;
		}
	} else {
		if (RECORD.length > 1) {
			RECORD.length--;
		}
	}
}
// 播放上一曲
function playPrevious() {
	switch(MODE) {
		case 1:// 顺序播放
			if (--CURRENT >= 0) {
				playCurrent(CURRENT);
			} else if (++CURRENT < 0) {
				CURRENT = -1;
			}
			break;
		case 2:// 随机播放
			playRecord(false);
			CURRENT = RECORD[RECORD.length - 1];
		case 3:// 单曲循环
			playCurrent(CURRENT);
			break;
	}
}
// 播放当前歌曲
function playCurrent(num) {
	$("stop").click();
	$("play").click();
	CURRENT = num;
	playStyle(num);
	disableCheck(num);
	$("player").URL = PLAYLIST[num].url;
	$("player").controls.next();
}
// 播放下一曲
function playNext() {
	switch(MODE) {
		case 1:// 顺序播放
			if (++CURRENT < PLAYLIST.length) {
				playCurrent(CURRENT);
			} else {
				CURRENT = PLAYLIST.length;
				clearStatus();
				$("status").innerText = "";
				playStyle(PLAYLIST.length);
				disableCheck(PLAYLIST.length);
				clearInterval(LISTENER);
			}
			break;
		case 2:// 随机播放
			var next = CURRENT;
			do {
				if (PLAYLIST.length <= 1) {
					break;
				}
				CURRENT = Math.floor(Math.random()*PLAYLIST.length);
			} while(next == CURRENT);
			playRecord(true);
		case 3:// 单曲循环
			playCurrent(CURRENT);
			break;
	}
}
// 顺序播放事件
$("order").onclick = function() {
	MODE = 1;
	this.style.background = Panel.orderOnImage;
	$("random").style.background = Panel.randomHoverImage;
	$("cycle").style.background = Panel.cycleHoverImage;
};
$("order").onmouseover = function() {
	this.style.background = Panel.orderOnImage;
};
$("order").onmouseout = function() {
	if (MODE != 1) {
		this.style.background = Panel.orderHoverImage;
	}
};
// 随机播放事件
$("random").onclick = function() {
	MODE = 2;
	$("order").style.background = Panel.orderHoverImage;
	this.style.background = Panel.randomOnImage;
	$("cycle").style.background = Panel.cycleHoverImage;
};
$("random").onmouseover = function() {
	this.style.background = Panel.randomOnImage;
};
$("random").onmouseout = function() {
	if (MODE != 2) {
		this.style.background = Panel.randomHoverImage;
	}
};
// 单曲循环事件
$("cycle").onclick = function() {
	MODE = 3;
	$("order").style.background = Panel.orderHoverImage;
	$("random").style.background = Panel.randomHoverImage;
	this.style.background = Panel.cycleOnImage;
};
$("cycle").onmouseover = function() {
	this.style.background = Panel.cycleOnImage;
};
$("cycle").onmouseout = function() {
	if (MODE != 3) {
		this.style.background = Panel.cycleHoverImage;
	}
};

////////////////////////////////////////////////////////////////
// 当前选择不可用
function disableCheck(num) {
	if ($("playlist-list") == null) {
		return;
	}
	var checkbox = $("playlist-list").getElementsByTagName("table").item(0).getElementsByTagName("input");
	for (var i = 0; i < checkbox.length; i++) {
		checkbox[i].disabled = (i == num ? true:false);
	}
	if (num >=0 && num < checkbox.length) {
		checkbox[num].checked = false;
	}
}
// 全选/反选事件
$("all").onclick = function() {
	if ($("playlist-list") == null) {
		return;
	}
	var checkbox = $("playlist-list").getElementsByTagName("table").item(0).getElementsByTagName("input");
	for (var i = 0; i < checkbox.length; i++) {
		checkbox[i].checked = (i == CURRENT ? false:this.checked);
	}
};

////////////////////////////////////////////////////////////////
// 进度条相关事件
$("progress-move").onmousedown = function() {
	PROGRESS = true;
};
document.onmousemove = function() {
	var progress = $("progress");	
	if (PROGRESS && $("player").playState == 3) {
		var evt = window.event;
		var length = evt.clientX - progress.getBoundingClientRect().left;
		moveLength("progress", "progress-forword", "progress-move", length);
		setCurrent();
	}
};
document.onmouseup = function() {
	if (PROGRESS) {
		var time = $("current").innerText.split(":");
		$("player").controls.currentPosition = parseInt(time[0]*60, 10) + parseInt(time[1], 10);
	}
	PROGRESS = false;
};
// 移动进度条
function moveLength(progressId, forwordId, moveId, length) {
	var progress = $(progressId);
	var forword = $(forwordId);
	var move = $(moveId);

	if (length <= 0){
		forword.style.width = 0;
	} else if (length >= progress.clientWidth - 2) {
		forword.style.width = progress.clientWidth - 2;
	} else {
		forword.style.width = length;
	}
	if (length <= 0) {
		move.style.left = 0;
	} else if (length + move.clientWidth >= progress.clientWidth) {
		move.style.left = progress.clientWidth - move.clientWidth;
	} else {
		move.style.left = length;
	}
}
// 设置进度条的播放位置
function setProgress() {
	if (!PROGRESS && $("player").playState == 3) {
		var length = $("player").controls.currentPosition / $("player").currentMedia.duration;
		length *= $("progress").clientWidth - $("progress-move").clientWidth;
		moveLength("progress", "progress-forword", "progress-move", length);
	}
}
// 设置当前播放时间
function setCurrent() {
	if (PROGRESS) {
		var length = $("progress-forword").clientWidth / ($("progress").clientWidth - $("progress-move").clientWidth);
		length *= $("player").currentMedia.duration;
		var time = parseInt(length, 10);
		var current = "";
		if (parseInt(time/60, 10) < 10) {
			current += "0" + parseInt(time/60, 10);
		} else {
			current += parseInt(time/60, 10);
		}
		if (parseInt(time%60, 10) < 10) {
			current += ":0" + parseInt(time%60, 10);
		} else {
			current += ":" + parseInt(time%60, 10);
		}		
		$("current").innerText = current;
	}
}

////////////////////////////////////////////////////////////////
// 添加歌曲
$("action-add").onclick = function() {
	$("add-panel").style.display = "block";
};
// 浏览文件
$("file").onclick = function() {
	$("file-scan").value = "";
	$("file-scan").click();
	if ($("file-scan").value.trim() != "") {
		$("file-scan").select();
		var file = document.selection.createRange().text;
        document.selection.empty(); 
		file = file.replace(/\\/g, "/");
		file = "file:///" + file;
		$("music-url").value = file;
	}
};
// 确定添加
$("confirm").onclick = function() {
	if ($("music-singer").value.trim()== "") {
		$("message").style.display = "block";
		$("message-info").innerHTML = "请输入演唱者！";
		return;
	} else if ($("music-name").value.trim()== "") {
		$("message").style.display = "block";
		$("message-info").innerHTML = "请输入歌曲名！";
		return;
	} else if ($("music-url").value.trim()== "") {
		$("message").style.display = "block";
		$("message-info").innerHTML = "请输入链接地址！";
		return;
	}
	
	$("add-panel").style.display = "none";
	var key = "action=add";
	key += "&singer=" + $("music-singer").value.trim();
	key += "&name=" + $("music-name").value.trim();
	key += "&url=" + $("music-url").value.trim();
	startRequest(key, "添加");
};
$("music-singer").onfocus = $("music-name").onfocus = $("music-url").onfocus = function () {
	this.select();
};
// 移除歌曲
$("action-delete").onclick = function() {
	if ($("playlist-list") == null) {
		return ;
	}
	var key = "action=delete&index=";
	var checkbox = $("playlist-list").getElementsByTagName("table").item(0).getElementsByTagName("input");
	var choose = false;
	REMOVE = CURRENT;
	for (var i = 0; i < checkbox.length; i++) {
		if (checkbox[i].checked) {
			choose = true;
			key += i + "#";
			if (i < CURRENT) {
				REMOVE--;
			}
		}
	}
	if (choose) {
		startRequest(key, "移除");
	} else {
		$("message").style.display = "block";
		$("message-info").innerHTML = "请选择要移除的歌曲！";
	}
};

////////////////////////////////////////////////////////////////
// Ajax Action
function createXMLHttpRequest() {
	if (window.ActiveXObject) {
		XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}
function startRequest(key, action) {
	Action = action;
	$("message").style.display = "block";
	$("message-info").innerHTML = "正在"+action+"，请稍候……";
	
	createXMLHttpRequest();	
	XmlHttp.onreadystatechange = handleStateChange;
	XmlHttp.open("POST", "player.jsp", true);
	XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	XmlHttp.send(key);
}
function handleStateChange() {
	if (XmlHttp.readyState == 4) {
		if (XmlHttp.status == 200) {
			readPlaylist("playlist-list", "player/playlist.xml");
			$("message-info").innerHTML = "歌曲" + Action + "成功！";
			if (Action == "移除") {
				CURRENT = REMOVE;
			}
			setStyle();
			if ($("player").playState != 1) {
				playStyle(CURRENT);
				disableCheck(CURRENT);
			}
		} else if (XmlHttp.status >= 400) {
			$("message-info").innerHTML = "歌曲" + Action + "失败！";
		}
	}
}