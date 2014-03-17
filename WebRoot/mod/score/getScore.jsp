<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ScoreDao, csii.bean.Score, java.util.List, csii.util.JsonUtil" %>
<%
	int start = Integer.parseInt(request.getParameter("start"));
	int limit = Integer.parseInt(request.getParameter("limit"));
	
	int classID = 0;
	try{
		classID = Integer.parseInt(request.getParameter("chooseClass"));
	}catch(Exception e){
		e.printStackTrace();
	}
	//System.err.println("classID = " + classID);
	try{
		ScoreDao scoreDao = new ScoreDao();
		List<Score> list = scoreDao.getScorePart(start, limit, classID);
		int total = scoreDao.getAllScoreByClass(classID);
		response.getWriter().write("{success:"+ true +", total:"+ total +
		", scoreList:"+ JsonUtil.list2json(list) +"}");
		//System.err.println("total = " + total + ", list = " + list.toString());
	}catch(Exception e){
		response.getWriter().write("{success:"+ false +", total:"+ 0 +"}");
	}
%>