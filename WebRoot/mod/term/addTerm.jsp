<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.TermDao, csii.bean.Term" %>
<%
	String termDes = request.getParameter("termDesAdd");
	Term term = new Term();
	term.setTermDes(termDes);
	try{
		int state = new TermDao().addTerm(term);
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