package csii.dao;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import csii.bean.Student;

/**
 * 对学生信息在数据库中的操作
 * @author xiehai
 * @date 2013-7-2 上午10:19:36 	
 */
public class StudentDao extends BaseConnection {
	/**
	 * 添加一个学生信息
	 * @param student
	 * @return 添加完成的状态1成功 -1 已存在
	 * @throws SQLException
	 */
	public int addStudent(Student student)throws SQLException{
		if(isStudentExist(student, false)){
			return -1;
		}
		String sql = "insert into Student(classID, studentSex, studentName) values(?, ?, ?)";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, student.getClassID());
		stat.setString(2, student.getStudentSex());
		stat.setString(3, student.getStudentName());
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 返回数据库中从start开始最多limit条学生的记录
	 * @param start 开始索引
	 * @param limit 最大条数
	 * @return 学生集合List
	 * @throws SQLException
	 */
	public List<Student> getStudentPart(int start, int limit)throws SQLException{
		String sql = "select * from Student limit ?, ?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, start);
		stat.setInt(2, limit);
		rs = stat.executeQuery();
		List<Student> list = new LinkedList<Student>();
		while(rs.next()){
			Student student = new Student();
			student.setStudentID(rs.getInt(1));
			student.setClassID(rs.getInt(2));
			student.setStudentSex(rs.getString(4));
			student.setStudentName(rs.getString(3));
			list.add(student);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 查询学生记录的数量
	 * @return 学生信息记录总数
	 * @throws SQLException
	 */
	public int getCount()throws SQLException{
		int count = 0;
		String sql = "select count(*) from Student";
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		if(rs.next()){
			count = rs.getInt(1);
		}
		this.close();
		
		return count;
	}
	
	/**
	 * 在同一个班是否有相同性别、相同名字的人
	 * @param student 学生的信息
	 * @param flag 是否与本人比较 true比较 false不比较
	 * @return true存在 false不存在
	 * @throws SQLException
	 */
	public boolean isStudentExist(Student student, boolean flag)throws SQLException{
		boolean flg = false;
		String sql = "select * from Student where classID=? and studentSex=? and studentName=?";
		if(flag){
			sql += " and studentID <>?";
		}
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, student.getClassID());
		stat.setString(2, student.getStudentSex());
		stat.setString(3, student.getStudentName());
		if(flag){
			stat.setInt(4, student.getStudentID());
		}
		rs = stat.executeQuery();
		if(rs.next()){
			flg = true;
		}
		this.close();
		
		return flg;
	}
	
	/**
	 * 修改学生信息
	 * @param student 学生信息
	 * @return 修改完成的状态 -1学生已存在 其他为成功
	 * @throws SQLException
	 */
	public int editStudent(Student student)throws SQLException{
		if(isStudentExist(student, true)){
			return -1;
		}
		String sql = "update Student set classID=?, studentSex=?, studentName=? where studentID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, student.getClassID());
		stat.setString(2, student.getStudentSex());
		stat.setString(3, student.getStudentName());
		stat.setInt(4, student.getStudentID());
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 通过学生ID删除学生
	 * @param studentID 学生ID
	 * @return 删除完成的状态
	 * @throws SQLException
	 */
	public int deleteStudent(int studentID)throws SQLException{
		String sql = "delete from Student where studentID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, studentID);
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 获得指定班级ID的学生集合
	 * @param classID 班级ID
	 * @return 学生List
	 * @throws SQLException
	 */
	public List<Student> getStudentByClass(int classID)throws SQLException{
		String sql = "select * from Student where classID=?";
		List<Student> list = new LinkedList<Student>();
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, classID);
		rs = stat.executeQuery();
		if(rs.wasNull()){
			return null;
		}
		while(rs.next()){
			Student student = new Student();
			student.setStudentID(rs.getInt(1));
			student.setStudentName(rs.getString(3));
			list.add(student);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 通过学生ID返回学生信息
	 * @param studentID 学生ID
	 * @return 学生信息
	 * @throws SQLException
	 */
	public Student getStudentByID(int studentID)throws SQLException{
		String sql = "select * from Student where studentID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, studentID);
		rs = stat.executeQuery();
		Student student = new Student();
		if(rs.next()){
			student.setStudentID(studentID);
			student.setClassID(rs.getInt(2));
			student.setStudentName(rs.getString(3));
			student.setStudentSex(rs.getString(4));
		}
		this.close();
		
		return student;
	}
}
