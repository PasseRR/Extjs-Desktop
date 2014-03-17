<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.SubjectDao, csii.bean.Subject" %>
<%
	String subjectDes = request.getParameter("subjectDesAdd");
	Subject subject = new Subject();
	subject.setSubjectDes(subjectDes);
	SubjectDao subjectDao = new SubjectDao();
	try{
		int state = subjectDao.addSubject(subject);
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