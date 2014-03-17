package csii.dao;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import csii.bean.Subject;

/**
 * 对教学科目的数据库操作
 * @author xiehai
 * @date 2013-7-2 下午06:06:24 	
 */
public class SubjectDao extends BaseConnection {
	
	/**
	 * 是否存在一个同名的科目
	 * @param subjectDes 科目描述
	 * @param flg 是否和自己比较
	 * @return true存在 false不存在
	 * @throws SQLException
	 */
	public boolean isSubjectExist(Subject subject, boolean flg)throws SQLException{
		boolean flag = false;
		String sql = "select * from Subject where subjectDes=?";
		if(flg){
			sql += " and subjectID<>?";
		}
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, subject.getSubjectDes());
		if(flg){
			stat.setInt(2, subject.getSubjectID());
		}
		rs = stat.executeQuery();
		if(rs.next()){
			flag = true;
		}
		this.close();
		
		return flag;
	}
	
	/**
	 * 添加一个教学科目
	 * @param subjectDes 科目描述
	 * @return 添加科目完成的状态 -1科目存在 其他则添加成功
	 * @throws SQLException
	 */
	public int addSubject(Subject subject)throws SQLException{
		//判断科目是否存在
		if(isSubjectExist(subject, false)){
			return -1;
		}
		String sql = "insert into Subject(subjectDes) values(?)";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, subject.getSubjectDes());
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 获得科目总数
	 * @return 科目总数
	 * @throws SQLException
	 */
	public int getCount()throws SQLException{
		int count = 0;
		String sql = "select count(*) from Subject";
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		if(rs.next()){
			count = rs.getInt(1);
		}
		this.close();
		
		return count;
	}
	
	/**
	 * 获得数据库中科目从start开始最大limit条记录
	 * @param start 开始索引
	 * @param limit 最大记录数限制
	 * @return 科目List
	 * @throws SQLException
	 */
	public List<Subject> getSubjectPart(int start, int limit)throws SQLException{
		List<Subject> list = new LinkedList<Subject>();
		String sql = "select * from Subject limit ?, ?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, start);
		stat.setInt(2, limit);
		rs = stat.executeQuery();
		while(rs.next()){
			Subject subject = new Subject();
			subject.setSubjectID(rs.getInt(1));
			subject.setSubjectDes(rs.getString(2));
			list.add(subject);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 修改一个现有的科目
	 * @param subject 
	 * @return 修改完成的状态 -1修改的科目已存在 其他则修改成功
	 * @throws SQLException
	 */
	public int editSubject(Subject subject)throws SQLException{
		if(isSubjectExist(subject, true)){
			return -1;
		}
		int state;
		String sql = "update Subject set subjectDes=? where subjectID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, subject.getSubjectDes());
		stat.setInt(2, subject.getSubjectID());
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 删除一个现有的科目
	 * @param subjectID 科目ID
	 * @return 删除完成的状态
	 * @throws SQLException
	 */
	public int deleteSubject(int subjectID)throws SQLException{
		int state;
		String sql = "delete from Subject where subjectID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, subjectID);
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 获得所有的科目
	 * @return 科目List
	 * @throws SQLException
	 */
	public List<Subject> getAllSubject()throws SQLException{
		String sql = "select * from subject";
		List<Subject> list = new LinkedList<Subject>();
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		while(rs.next()){
			Subject subject = new Subject();
			subject.setSubjectID(rs.getInt(1));
			subject.setSubjectDes(rs.getString(2));
			list.add(subject);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 通过科目ID来获取科目描述信息(科目名)
	 * @param subjectID 科目ID
	 * @return 科目描述(科目名)
	 * @throws SQLException
	 */
	public Subject getSubjectByID(int subjectID)throws SQLException{
		Subject subject = new Subject();
		String sql = "select * from Subject where subjectID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, subjectID);
		rs = stat.executeQuery();
		if(rs.next()){
			subject.setSubjectID(subjectID);
			subject.setSubjectDes(rs.getString(2));
		}
		this.close();
		
		return subject;
	}
}
