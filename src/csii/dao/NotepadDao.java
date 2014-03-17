package csii.dao;

import java.sql.SQLException;

/**
 * 对记事本数据库的操作
 * @author xiehai
 * @date 2013-7-1 下午05:55:28 	
 */
public class NotepadDao extends BaseConnection{
	/**
	 * 保存用户记事本的内容
	 * @param notepadID 记事本ID
	 * @param userID 用户ID
	 * @param noteText 记事本内容
	 * @return 保存完成的状态
	 * @throws SQLException
	 */
	public int saveNotepad(int notepadID, int userID, String noteText)throws SQLException{
		String sql = "update Notepad set noteText=? where notepadID=? and userID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, noteText);
		stat.setInt(2, notepadID);
		stat.setInt(3, userID);
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 通过用户返回其记事本
	 * @param userID 用户ID
	 * @return 记事本内容
	 * @throws SQLException
	 */
	public String getNotepad(int userID)throws SQLException{
		String noteText = "";
		String sql = "select * from Notepad where userID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, userID);
		rs = stat.executeQuery();
		if(rs.next()){
			noteText = rs.getString(3);
		}
		this.close();
		
		return noteText;
	}
}
