<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.bean.Class, csii.dao.ClassDao" %>
<% 
	ClassDao classDao = new ClassDao();
	Class cl = new Class();
	String classDes = request.getParameter("classDesAdd");
	cl.setClassDes(classDes);
	try{
		int state = classDao.addClass(cl);
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