package csii.bean;

/**
 * 学期信息Bean类
 * @author xiehai
 * @date 2013-7-3 下午02:39:01 	
 */
public class Term {
	/**
	 * 学期ID
	 */
	private int termID;
	/**
	 * 学期描述
	 */
	private String termDes;
	public int getTermID() {
		return termID;
	}
	public void setTermID(int termID) {
		this.termID = termID;
	}
	public String getTermDes() {
		return termDes;
	}
	public void setTermDes(String termDes) {
		this.termDes = termDes;
	}
	@Override
	public String toString() {
		return "termID = " + this.termID + ", termDes = " + this.termDes;
	}
}
