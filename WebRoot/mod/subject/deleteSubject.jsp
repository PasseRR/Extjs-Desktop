<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.SubjectDao" %>
<%
	int subjectID = Integer.parseInt(request.getParameter("deleteSubjectID"));
	try{
		new SubjectDao().deleteSubject(subjectID);
		response.getWriter().write("{success:"+ true +"}");
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:"+ false +"}");
	}
%>