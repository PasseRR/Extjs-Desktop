<%@ page language="java" pageEncoding="UTF-8" import="java.util.LinkedList, java.util.List"%>
<%@ page import="csii.bean.Class, csii.dao.ClassDao, csii.util.JsonUtil" %>
<%
	ClassDao classDao = new ClassDao();
	List<Class> list = new LinkedList<Class>();
	int start = Integer.parseInt(request.getParameter("start"));
	int limit = Integer.parseInt(request.getParameter("limit"));	
	try{
		list = classDao.getClassPart(start, limit);
		int total = classDao.getClassCount();
		String json = "{total:"+ total +",classList:" + JsonUtil.list2json(list) + "}";
		response.getWriter().write(json);		
	}catch(Exception e){
		e.printStackTrace();		
	}
%>