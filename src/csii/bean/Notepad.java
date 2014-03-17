package csii.bean;

/**
 * 记事本Bean类
 * @author xiehai
 * @date 2013-7-1 下午05:53:14 	
 */
public class Notepad {
	/**
	 * 记事本ID
	 */
	private int notepadID;
	/**
	 * 用户ID
	 */
	private int userID;
	/**
	 * 记事本内容,包括格式
	 */
	private String noteText;
	
	public int getNotepadID() {
		return notepadID;
	}
	public void setNotepadID(int notepadID) {
		this.notepadID = notepadID;
	}
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public String getNoteText() {
		return noteText;
	}
	public void setNoteText(String noteText) {
		this.noteText = noteText;
	}
}
