<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.bean.Class, csii.dao.ClassDao" %>
<%
	int classID = Integer.parseInt(request.getParameter("classIDEdit"));
	String classDes = request.getParameter("classDesEdit");
	Class cl = new Class();
	cl.setClassDes(classDes);
	cl.setClassID(classID);
	ClassDao classDao = new ClassDao();
	//修改这个班级描述
	try{
		int state = classDao.editClass(cl);
		if(state == -1){
			response.getWriter().write("{success:"+ false +"}");
		}else{
			response.getWriter().write("{success:"+ true +"}");
		}
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:'exception'}");
	}
%>