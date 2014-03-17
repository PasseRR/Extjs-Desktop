<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ScoreDao, csii.bean.ScoreDetail, java.util.List, csii.util.JsonUtil" %>
<% 
	int studentID = Integer.parseInt(request.getParameter("studentID"));
	//System.err.println("studentID = " + studentID);
	List<ScoreDetail> list = new ScoreDao().getScoreByName(studentID);
	System.err.println(list.toString());
	response.getWriter().write("{success:"+ true +", scoreDetailList:"+ JsonUtil.list2json(list) +"}");
%>