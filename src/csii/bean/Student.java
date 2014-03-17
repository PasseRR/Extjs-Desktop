package csii.bean;

/**
 * 学生信息Bean类
 * @author xiehai
 * @date 2013-7-2 上午10:16:33 	
 */
public class Student {
	/**
	 * 学生ID
	 */
	private int studentID;
	/**
	 * 班级ID
	 */
	private int classID;
	/**
	 * 学生性别
	 */
	private String studentSex;
	/**
	 * 学生名字
	 */
	private String studentName;
	
	public int getStudentID() {
		return studentID;
	}
	public void setStudentID(int studentID) {
		this.studentID = studentID;
	}
	public int getClassID() {
		return classID;
	}
	public void setClassID(int classID) {
		this.classID = classID;
	}
	public String getStudentSex() {
		return studentSex;
	}
	public void setStudentSex(String studentSex) {
		this.studentSex = studentSex;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "studentID = " + this.studentID + ", classID = " + this.classID +
		", studentSex = " + this.studentSex + ", studentName = " + this.studentName;
	}
}
