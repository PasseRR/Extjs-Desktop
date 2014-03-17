<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.NotepadDao, csii.util.JsonUtil" %>
<%
	NotepadDao notepadDao = new NotepadDao();
	try{
		String note = notepadDao.getNotepad(1);
		//System.err.println(note);
		response.getWriter().write("{success:"+ true +", notepad:"+ JsonUtil.object2json(note) +"}");
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:"+ false +"}");
	}
%>