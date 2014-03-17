package csii.bean;

/**
 * 教学科目Bean类
 * @author xiehai
 * @date 2013-7-2 下午06:04:26 	
 */
public class Subject {
	/**
	 * 科目ID
	 */
	private int subjectID;
	/**
	 * 科目描述
	 */
	private String subjectDes;
	public int getSubjectID() {
		return subjectID;
	}
	public void setSubjectID(int subjectID) {
		this.subjectID = subjectID;
	}
	public String getSubjectDes() {
		return subjectDes;
	}
	public void setSubjectDes(String subjectDes) {
		this.subjectDes = subjectDes;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "subjectID = " + this.subjectID + ", subjectDes = " + this.subjectDes;
	}
}
