<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.StudentDao, java.util.List, csii.bean.Student, csii.util.JsonUtil" %>
<% 
	
	try{
		int classID = Integer.parseInt(request.getParameter("studentClass"));
		//System.err.println("classID = " + classID);
		List<Student> list = new StudentDao().getStudentByClass(classID);
		//System.err.println(list.toString());
		response.getWriter().write("{success:"+ true +", studentList:"+ JsonUtil.list2json(list)+"}");
	}catch(Exception e){
		e.printStackTrace();
	}
%>