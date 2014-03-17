<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ClassDao, java.util.List, csii.bean.Class, csii.util.JsonUtil" %>
<% 
	List<Class> list = new ClassDao().getAllClass();
	response.getWriter().write("{classList:"+ JsonUtil.list2json(list) +"}");
%>