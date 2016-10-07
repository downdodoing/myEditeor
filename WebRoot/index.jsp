<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'index.jsp' starting page</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="css/index.css" rel="stylesheet" type="text/css">
</head>

<body>
	<div id="title">
		<p style="font-size: 13px;">编译原理演示系统</p>
	</div>
	<div id="nav">
		<input type="file" id="fileInput" style="display:none;" />
		<ul>
			<li><a href="#">文件</a>
				<ul>
					<li><a href="#" id="open" type="file">打开</a></li>
					<li id="save"><a href="#">保存</a></li>
					<li id="save_other"><a href="#">另存为</a></li>
					<li id="recent"><a href="#">最近文件</a></li>
					<li id="exit"><a href="#">退出</a></li>
				</ul></li>
			<li><a href="#">编辑</a></li>
			<li><a href="#">词法分析</a></li>
			<li><a href="#">语法分析</a></li>
			<li><a href="#">中间代码</a></li>
			<li><a href="#">目标代码生成</a></li>
			<li><a href="#">查看</a></li>
			<li><a href="#">帮助</a></li>
		</ul>
	</div>
	<div>
		<div id="editor">
			<textarea rows="36" cols="91" id="text"></textarea>
		</div>
		<div id="show_info">
			<div></div>
			<div></div>
		</div>
	</div>
	<script type="text/javascript" src="jquery/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</body>
</html>
