<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ClassDao" %>
<%
	int classID = Integer.parseInt(request.getParameter("classIDDelete"));
	ClassDao classDao = new ClassDao();
	try{
		int state = classDao.deleteClass(classID);
		if(state == 1){
			response.getWriter().write("{success:"+ true +"}");
		}else{
			response.getWriter().write("{success:"+ false +"}");
		}
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:"+ false +"}");
	}
%>