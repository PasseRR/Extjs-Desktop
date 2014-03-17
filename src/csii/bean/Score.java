package csii.bean;

/**
 * 学生成绩信息Bean类
 * @author xiehai
 * @date 2013-7-3 上午09:58:19 	
 */
public class Score {
	/**
	 * 成绩ID
	 */
	private int scoreID;
	/**
	 * 班级ID
	 */
	private int classID;
	/**
	 * 学生ID
	 */
	private int studentID;
	/**
	 * 科目ID
	 */
	private int subjectID;
	/**
	 * 成绩分数
	 */
	private int scoreNum;
	/**
	 * 学期ID
	 */
	private int termID;
	public int getScoreID() {
		return scoreID;
	}
	public void setScoreID(int scoreID) {
		this.scoreID = scoreID;
	}
	public int getClassID() {
		return classID;
	}
	public void setClassID(int classID) {
		this.classID = classID;
	}
	public int getStudentID() {
		return studentID;
	}
	public void setStudentID(int studentID) {
		this.studentID = studentID;
	}
	public int getSubjectID() {
		return subjectID;
	}
	public void setSubjectID(int subjectID) {
		this.subjectID = subjectID;
	}
	public int getScoreNum() {
		return scoreNum;
	}
	public void setScoreNum(int scoreNum) {
		this.scoreNum = scoreNum;
	}
	public int getTermID() {
		return termID;
	}
	public void setTermID(int termID) {
		this.termID = termID;
	}
	@Override
	public String toString() {
		return "scoreID = " + this.scoreID + ", classID = " + this.classID +
		", studentID = " + this.studentID + ", subjectID = " + this.subjectID + 
		", termID = " + this.termID + ", scoreNum = " + this.scoreNum;
	}
}
