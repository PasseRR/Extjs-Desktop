<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ScoreDao, csii.bean.Score" %>
<%
	int classID = Integer.parseInt(request.getParameter("classIDAdd"));
	int studentID = Integer.parseInt(request.getParameter("studentIDAdd"));
	int subjectID = Integer.parseInt(request.getParameter("subjectIDAdd"));
	int termID = Integer.parseInt(request.getParameter("termIDAdd"));
	int scoreNum = Integer.parseInt(request.getParameter("scoreNumAdd"));
	Score score = new Score();
	score.setClassID(classID);
	score.setStudentID(studentID);
	score.setSubjectID(subjectID);
	score.setTermID(termID);
	score.setScoreNum(scoreNum);
	try{
		int state = new ScoreDao().addScore(score);
		if(-1 == state){
			response.getWriter().write("{success:"+ false +"}");
		}else{
			response.getWriter().write("{success:"+ true +"}");
		}
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:'exception'}");
	}
%>