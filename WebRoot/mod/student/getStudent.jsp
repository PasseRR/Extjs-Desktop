<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.StudentDao, java.util.List, csii.bean.Student, csii.util.JsonUtil" %>
<%
	int start = Integer.parseInt(request.getParameter("start"));
	int limit = Integer.parseInt(request.getParameter("limit"));
	StudentDao studentDao = new StudentDao();
	List<Student> list = studentDao.getStudentPart(start, limit);
	int total = studentDao.getCount();
	//System.err.println(list.toString());
	response.getWriter().write("{total:"+ total +",studentList:"+ JsonUtil.list2json(list) +"}");
%>