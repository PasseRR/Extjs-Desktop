<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.StudentDao, csii.bean.Student" %>
<% 
	int studentID = Integer.parseInt(request.getParameter("editStudentID"));
	int classID = Integer.parseInt(request.getParameter("editClassID"));
	String studentSex = request.getParameter("editStudentSex");
	String studentName = request.getParameter("editStudentName");
	try{
		Student student = new Student();
		student.setClassID(classID);
		student.setStudentID(studentID);
		student.setStudentSex(studentSex);
		student.setStudentName(studentName);
		//System.err.println(student.toString());
		int state = new StudentDao().editStudent(student);
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