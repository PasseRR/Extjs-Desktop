<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.ScoreDao, csii.bean.Score" %>
<%
	int scoreID = Integer.parseInt(request.getParameter("scoreIDEdit"));
	int classID = Integer.parseInt(request.getParameter("classIDEdit"));
	int studentID = Integer.parseInt(request.getParameter("studentIDEdit"));
	int termID = Integer.parseInt(request.getParameter("termIDEdit"));
	int subjectID = Integer.parseInt(request.getParameter("subjectIDEdit"));
	int scoreNum = Integer.parseInt(request.getParameter("scoreNumEdit"));
	Score score = new Score();
	score.setScoreID(scoreID);
	score.setClassID(classID);
	score.setStudentID(studentID);
	score.setTermID(termID);
	score.setSubjectID(subjectID);
	score.setScoreNum(scoreNum);
	//System.err.println(score.toString());
	try{
		int state = new ScoreDao().editScore(score, true);
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