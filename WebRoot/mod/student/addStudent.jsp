<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.StudentDao, csii.bean.Student" %>
<% 
	int classID = Integer.parseInt(request.getParameter("classIDAdd"));
	String studentSex = request.getParameter("studentSexAdd");
	String studentName = request.getParameter("studentNameAdd");
	Student student = new Student();
	student.setClassID(classID);
	student.setStudentName(studentName);
	student.setStudentSex(studentSex);
	try{
		int state = new StudentDao().addStudent(student);
		if(1 == state){
			response.getWriter().write("{success:"+ true +"}");
		}else if(-1 == state){
			response.getWriter().write("{success:"+ false +"}");
		}
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:'exception'}");
	}
%>