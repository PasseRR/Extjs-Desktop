<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.SubjectDao, csii.bean.Subject" %>
<% 
	int subjectID = Integer.parseInt(request.getParameter("editSubjectID"));
	String subjectDes = request.getParameter("editSubjectDes");
	Subject subject = new Subject();
	subject.setSubjectDes(subjectDes);
	subject.setSubjectID(subjectID);
	System.err.println(subject.toString());
	try{
		int state = new SubjectDao().editSubject(subject);
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