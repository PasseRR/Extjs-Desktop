<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.TermDao, csii.util.JsonUtil, csii.bean.Term, java.util.List" %>
<% 
	int start = Integer.parseInt(request.getParameter("start"));
	int limit = Integer.parseInt(request.getParameter("limit"));
	try{
		TermDao termDao = new TermDao();
		List<Term> list = termDao.getTermPart(start, limit);
		int total = termDao.getCount();
		response.getWriter().write("{total:"+ total +", termList:"+ JsonUtil.list2json(list)+"}");
	}catch(Exception e){
		e.printStackTrace();
	}
%>