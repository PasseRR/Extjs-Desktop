package csii.dao;

import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import csii.bean.Term;

/**
 * 对学期信息的数据库操作
 * @author xiehai
 * @date 2013-7-3 下午02:40:54 	
 */
public class TermDao extends BaseConnection {
	/**
	 * 获得所有的学期信息
	 * @return 学期List
	 * @throws SQLException
	 */
	public List<Term> getAllTerm()throws SQLException{
		String sql = "select * from Term";
		List<Term> list = new LinkedList<Term>();
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		while(rs.next()){
			Term term = new Term();
			term.setTermID(rs.getInt(1));
			term.setTermDes(rs.getString(2));
			list.add(term);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 取出数据库中从start开始最大limit条学期记录
	 * @param start 开始索引
	 * @param limit 最大记录限制
	 * @return 学期List
	 * @throws SQLException
	 */
	public List<Term> getTermPart(int start, int limit)throws SQLException{
		List<Term> list = new LinkedList<Term>();
		String sql = "select * from Term limit ?, ?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, start);
		stat.setInt(2, limit);
		rs = stat.executeQuery();
		while(rs.next()){
			Term term = new Term();
			term.setTermID(rs.getInt(1));
			term.setTermDes(rs.getString(2));
			list.add(term);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 获得学期记录的总数
	 * @return
	 * @throws SQLException
	 */
	public int getCount()throws SQLException{
		int count = 0;
		String sql = "select count(*) from Term";
		stat = getInstance().prepareStatement(sql);
		rs = stat.executeQuery();
		if(rs.next()){
			count = rs.getInt(1);
		}
		this.close();
		
		return count;
	}
	
	/**
	 * 是否存在相同的学期记录
	 * @param term 
	 * @param flag 是否和自己比较 true比较 false 不比较
	 * @return true 存在 false 不存在
	 * @throws SQLException
	 */
	public boolean isTermExist(Term term, boolean flag)throws SQLException{
		boolean flg = false;
		String sql;
		if(flg){
			sql = "select * from Term where termID<>? and termDes=?";
			stat = getInstance().prepareStatement(sql);
			stat.setInt(1, term.getTermID());
			stat.setString(2, term.getTermDes());
		}else{
			sql = "select * from Term where termDes=?";
			stat = getInstance().prepareStatement(sql);
			stat.setString(1, term.getTermDes());
		}
		rs = stat.executeQuery();
		if(rs.next()){
			flg = true;
		}
		this.close();
		
		return flg;
	}
	
	/**
	 * 添加一个新的学期信息
	 * @param term
	 * @return 添加完成的状态 -1已存在 其他则成功
	 * @throws SQLException
	 */
	public int addTerm(Term term)throws SQLException{
		if(isTermExist(term, false)){
			return -1;
		}
		int state;
		String sql = "insert into Term(termDes) values(?)";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, term.getTermDes());
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 修改当前存在的学期信息
	 * @param term
	 * @return 修改完成的状态 -1已存在 其他则成功
	 * @throws SQLException
	 */
	public int editTerm(Term term)throws SQLException{
		if(isTermExist(term, true)){
			return -1;
		}
		int state;
		String sql = "update Term set termDes=? where termID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setString(1, term.getTermDes());
		stat.setInt(2, term.getTermID());
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 删除指定学期ID的学期记录
	 * @param termID 学期ID
	 * @return 删除完成的状态
	 * @throws SQLException
	 */
	public int deleteTerm(int termID)throws SQLException{
		int state;
		String sql = "delete from Term where termID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, termID);
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 通过学期ID来获得学期名
	 * @param termID 学期ID
	 * @return 学期描述(学期名)
	 * @throws SQLException
	 */
	public Term getTermByID(int termID)throws SQLException{
		Term term = new Term();
		String sql = "select * from Term where termID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, termID);
		rs = stat.executeQuery();
		if(rs.next()){
			term.setTermID(termID);
			term.setTermDes(rs.getString(2));
		}
		this.close();
		
		return term;
	}
}
