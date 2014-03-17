<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ScoreDao" %>
<%
	int scoreID = Integer.parseInt(request.getParameter("scoreIDDelete"));
	try{
		new ScoreDao().deleteScore(scoreID);
		response.getWriter().write("{success:"+ true +"}");
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:"+ false +"}");
	}
%>