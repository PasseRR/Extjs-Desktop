<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.StudentDao" %>
<% 
	int studentIDDelete = Integer.valueOf(request.getParameter("studentIDDelete"));
	try{
		new StudentDao().deleteStudent(studentIDDelete);
		response.getWriter().write("{success:"+ true +"}");
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:"+ false +"}");
	}
%>