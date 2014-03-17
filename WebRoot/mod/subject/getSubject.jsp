<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.SubjectDao, csii.util.JsonUtil, csii.bean.Subject, java.util.List" %>
<%
	int start = Integer.parseInt(request.getParameter("start"));
	int limit = Integer.parseInt(request.getParameter("limit"));
	SubjectDao subjectDao = new SubjectDao();
	int count = subjectDao.getCount();
	List<Subject> list = subjectDao.getSubjectPart(start, limit);
	response.getWriter().write("{total:"+ count +", subjectList:"+ JsonUtil.list2json(list) +"}");
%>