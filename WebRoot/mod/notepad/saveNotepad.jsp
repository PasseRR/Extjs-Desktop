<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="csii.dao.NotepadDao" %>
<%
	String notepad = request.getParameter("notepad");
	//String notepad = new String(request.getParameter("notepad").getBytes("ISO-8859-1"), "GB2312");
	NotepadDao notepadDao = new NotepadDao();
	try{
		int state = notepadDao.saveNotepad(1, 1, notepad);
		if(state == 1){
			response.getWriter().write("{success:"+ true +"}");
		}else{
			response.getWriter().write("{success:"+ false +"}");
		}
	}catch(Exception e){
		e.printStackTrace();
		response.getWriter().write("{success:'exception'}");
	}
%>