<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.TermDao, csii.util.JsonUtil, csii.bean.Term, java.util.List" %>
<% 
	List<Term> list = new TermDao().getAllTerm();
	response.getWriter().write("{success:"+ true +", termList:"+ JsonUtil.list2json(list) +"}");
%>
