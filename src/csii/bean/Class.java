package csii.bean;

/**
 * 班级Bean
 * @author xiehai
 * @date 2013-6-28 上午11:24:51 	
 */
public class Class {
	/**
	 * 班级ID
	 */
	private int classID;
	/**
	 * 班级描述
	 */
	private String classDes;
	
	public int getClassID() {
		return classID;
	}
	public void setClassID(int classID) {
		this.classID = classID;
	}
	public String getClassDes() {
		return classDes;
	}
	public void setClassDes(String classDes) {
		this.classDes = classDes;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "classID = " + this.classID + ", classDes = " + this.classDes;
	}
}
