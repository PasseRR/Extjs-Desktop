package csii.dao;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import csii.bean.Class;

/**
 * 数据库操作班级类
 * @author xiehai
 * @date 2013-6-28上午11:27:00 	
 */
public class ClassDao extends BaseConnection {
	
	/**
	 * 添加班级
	 * @param cl cl.classDes班级名字
	 * @return 添加完成的状态̬
	 * @throws SQLException
	 */
	public int addClass(Class cl) throws SQLException{
		//如果班级已经存在
		if(getClassByDes(cl.getClassDes()) != null){
			return -1;
		}
		String sql = "insert into Class(classDes) values(?)";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, cl.getClassDes());		
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}	
	
	/**
	 * 查询班级
	 * @return 班级List
	 * @throws SQLException
	 */
	public List<Class> getAllClass() throws SQLException{
		String sql = "select * from Class";
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		
		//将ResultSet转换为List
		List<Class> list = new LinkedList<Class>();		
		while(rs.next()){
			Class cl = new Class();
			cl.setClassID(rs.getInt(1));
			cl.setClassDes(rs.getString(2));
			list.add(cl);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 根据班级描述获取一个班级Bean
	 * @param classDes 班级名字
	 * @return
	 * @throws SQLException
	 */
	public Class getClassByDes(String classDes) throws SQLException{
		String sql = "select * from Class where classDes=?";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, classDes);
		rs = stat.executeQuery();
		if(rs.next()){
			Class cl = new Class();
			cl.setClassID(rs.getInt(1));
			cl.setClassDes(rs.getString(2));
			this.close();
			
			return cl;
		}		
		this.close();
		
		return null;
	}
	
	/**
	 * 获得班级记录的总数
	 * @return
	 * @throws SQLException
	 */
	public int getClassCount() throws SQLException{
		String sql = "select count(*) from Class";
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		if(rs.next()){
			int total = rs.getInt(1);
			this.close();
			
			return total;
		}
		this.close();
		
		return 0;
	}
	
	/**
	 * 查询从start开始最大limit条班级记录集合
	 * @param start 取记录开始的索引
	 * @param limit 最大记录条数
	 * @return
	 * @throws SQLException
	 */
	public List<Class> getClassPart(int start, int limit) throws SQLException{
		String sql = "select * from Class limit ?, ?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, start);
		stat.setInt(2, limit);
		rs = stat.executeQuery();
		List<Class> list = new LinkedList<Class>();
		while(rs.next()){
			Class cl = new Class();
			cl.setClassID(rs.getInt(1));
			cl.setClassDes(rs.getString(2));
			list.add(cl);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 通过班级ID修改班级的名字
	 * @param cl 班级ID 班级名
	 * @return -1名字重复 其他则修改成功
	 * @throws SQLException
	 */
	public int editClass(Class cl)throws SQLException{
		if(!isClassExist(cl)){
			return -1;
		}else{
			String sql = "update Class set classDes=? where classID=?";
			stat = getInstance().prepareStatement(sql);
			stat.setString(1, cl.getClassDes());
			stat.setInt(2, cl.getClassID());
			int state = stat.executeUpdate();
			this.close();
			
			return state;
		}
	}
	
	/**
	 * 判断除了当前班级ID的班级名是否有重名
	 * @param cl 班级ID 班级名
	 * @return true没有重复 false有重复
	 * @throws SQLException 
	 */
	public boolean isClassExist(Class cl) throws SQLException{
		String sql = "select * from Class where classDes=? and classID<>?";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, cl.getClassDes());
		stat.setInt(2, cl.getClassID());
		rs = stat.executeQuery();
		if(rs.next()){
			this.close();
			
			return false;
		}
		this.close();
		
		return true;
	}
	
	/**
	 * 删除一个班级通过其ID
	 * @param classID
	 * @return 删除状态1成功,其他失败
	 * @throws SQLException
	 */
	public int deleteClass(int classID)throws SQLException{
		String sql = "delete from Class where classID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, classID);
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}
}
