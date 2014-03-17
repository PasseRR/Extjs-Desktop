<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.TermDao" %>
<% 
	int termID = Integer.parseInt(request.getParameter("deleteID"));
	try{
		new TermDao().deleteTerm(termID);
		response.getWriter().write("{success:"+ true +"}");
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:"+ false +"}");
	}
%>