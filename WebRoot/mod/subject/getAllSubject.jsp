<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.SubjectDao, csii.util.JsonUtil, csii.bean.Subject, java.util.List" %>
<% 
	try{
		List<Subject> list = new SubjectDao().getAllSubject();
		response.getWriter().write("{success:"+ true +", subjectList:"+ JsonUtil.list2json(list)+"}");
	}catch(Exception e){
		e.printStackTrace();
	}
%>