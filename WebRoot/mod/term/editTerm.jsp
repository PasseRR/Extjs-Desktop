<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.TermDao, csii.bean.Term" %>
<%
	int termID = Integer.parseInt(request.getParameter("termIDEdit"));
	String termDes = request.getParameter("termDesEdit");
	Term term = new Term();
	term.setTermDes(termDes);
	term.setTermID(termID);
	try{
		int state = new TermDao().editTerm(term);
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