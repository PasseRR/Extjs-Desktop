package csii.bean;

/**
 * 成绩详细信息Bean
 * @author xiehai
 * @date 2013-7-5 下午01:45:40 	
 */
public class ScoreDetail {
	/**
	 * 学生名字
	 */
	private String studentName;
	/**
	 * 学期名
	 */
	private String termName;
	/**
	 * 科目名
	 */
	private String subjectName;
	/**
	 * 成绩
	 */
	private int scoreNum;
	private int chineseScore;
	private int mathScore;
	private int englishScore;
	
	public int getChineseScore() {
		return chineseScore;
	}
	public void setChineseScore(int chineseScore) {
		this.chineseScore = chineseScore;
	}
	public int getMathScore() {
		return mathScore;
	}
	public void setMathScore(int mathScore) {
		this.mathScore = mathScore;
	}
	public int getEnglishScore() {
		return englishScore;
	}
	public void setEnglishScore(int englishScore) {
		this.englishScore = englishScore;
	}
	public int getScoreNum() {
		return scoreNum;
	}
	public void setScoreNum(int scoreNum) {
		this.scoreNum = scoreNum;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getTermName() {
		return termName;
	}
	public void setTermName(String termName) {
		this.termName = termName;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "studentName = " + this.studentName + ", chineseScore = " + this.chineseScore +
			   ", mathScore = " + this.mathScore + ", englishScore = " + this.englishScore + 
			   ", termName = " + this.termName;
	}
}
