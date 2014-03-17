package csii.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import csii.bean.Score;
import csii.bean.ScoreDetail;

/**
 * 对成绩的数据库操作
 * @author xiehai
 * @date 2013-7-3 下午01:36:42 	
 */
public class ScoreDao extends BaseConnection {
	/**
	 * 返回ID为classID班从start开始最大limit条的成绩记录
	 * @param start 开始索引
	 * @param limit 最大记录限制
	 * @param classID 班级ID
	 * @return 成绩List
	 * @throws SQLException
	 */
	public List<Score> getScorePart(int start, int limit, int classID)throws SQLException{
		String sql;
		if(0 != classID){
			sql = "select * from Score where classID=? limit ?, ?";
			stat = getInstance().prepareStatement(sql);
			stat.setInt(1, classID);
			stat.setInt(2, start);
			stat.setInt(3, limit);
		}else{
			sql = "select * from Score limit ?, ? ";
			stat = getInstance().prepareStatement(sql);
			stat.setInt(1, start);
			stat.setInt(2, limit);
		}
		rs = stat.executeQuery();
		List<Score> list = new LinkedList<Score>();
		while(rs.next()){
			Score score = new Score();
			score.setScoreID(rs.getInt(1));
			score.setClassID(rs.getInt(3));
			score.setStudentID(rs.getInt(2));
			score.setSubjectID(rs.getInt(4));
			score.setTermID(rs.getInt(5));
			score.setScoreNum(rs.getInt(6));
			list.add(score);
		}
		this.close();
		
		return list;
	}
	
	/**
	 * 获得某个班级下成绩记录的数量
	 * @param classID 班级ID
	 * @return 成绩记录的总数
	 * @throws SQLException
	 */
	public int getAllScoreByClass(int classID)throws SQLException{
		String sql;
		int count = 0;
		if(0 == classID){
			sql = "select count(*) from Score";
			stat = getInstance().prepareStatement(sql);
		}else{
			sql = "select count(*) from Score where classID=?";
			stat = getInstance().prepareStatement(sql);
			stat.setInt(1, classID);
		}
		rs = stat.executeQuery();
		if(rs.next()){
			count = rs.getInt(1);
		}
		this.close();
		
		return count;
	}
	
	/**
	 * 添加一个新的成绩信息
	 * @param score 
	 * @return 添加完成的状态 -1已存在该记录 其他则成功
	 * @throws SQLException
	 */
	public int addScore(Score score)throws SQLException{
		if(isScoreExist(score, false)){
			return -1;
		}
		String sql = "insert into Score(classID, studentID, subjectID, termID, scoreNum)"+
					" values(?, ?, ?, ?, ?)";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, score.getClassID());
		stat.setInt(2, score.getStudentID());
		stat.setInt(3, score.getSubjectID());
		stat.setInt(4, score.getTermID());
		stat.setInt(5, score.getScoreNum());
		int state = stat.executeUpdate();
		this.close();
		
		return state;
	}

	/**
	 * 判断成绩记录在数据库中是否存在
	 * @param score
	 * @param flag 是否和自己比较 
	 * @return true存在 false不存在
	 * @throws SQLException
	 */
	public boolean isScoreExist(Score score, boolean flag)throws SQLException{
		boolean flg = false;
		String sql;
		if(flag){
			sql = "select * from Score where scoreID<>? and classID=? and studentID=? and"+
			" subjectID=? and termID=?";
			stat = getInstance().prepareStatement(sql);
			stat.setInt(1, score.getScoreID());
			stat.setInt(2, score.getClassID());
			stat.setInt(3, score.getStudentID());
			stat.setInt(4, score.getSubjectID());
			stat.setInt(5, score.getTermID());
		}else{
			sql = "select * from Score where classID=? and studentID=? and"+
			" subjectID=? and termID=?";
			stat = getInstance().prepareStatement(sql);
			stat.setInt(1, score.getClassID());
			stat.setInt(2, score.getStudentID());
			stat.setInt(3, score.getSubjectID());
			stat.setInt(4, score.getTermID());
		}
		rs = stat.executeQuery();
		if(rs.next()){
			flg = true;
		}
		this.close();
		
		return flg;
	}
	
	/**
	 * 通过成绩ID修改成绩
	 * @param score 成绩信息
	 * @param flag 是否和自己比较 true比较 false不比较
	 * @return 修改完成的状态 -1已存在 其他则成功
	 * @throws SQLException
	 */
	public int editScore(Score score, boolean flag)throws SQLException{
		if(isScoreExist(score, true)){
			return -1;
		}
		int state;
		String sql = "update Score set studentID=?, classID=?, subjectID=?, termID=?, scoreNum=?"+
					 " where scoreID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(2, score.getClassID());
		stat.setInt(1, score.getStudentID());
		stat.setInt(3, score.getSubjectID());
		stat.setInt(4, score.getTermID());
		stat.setInt(5, score.getScoreNum());
		stat.setInt(6, score.getScoreID());
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 通过成绩ID删除成绩信息
	 * @param scoreID 成绩ID
	 * @return 删除完成的状态
	 * @throws SQLException
	 */
	public int deleteScore(int scoreID)throws SQLException{
		int state;
		String sql = "delete from Score where scoreID=?";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, scoreID);
		state = stat.executeUpdate();
		this.close();
		
		return state;
	}
	
	/**
	 * 返回指定学生ID的所有成绩详细信息
	 * @param studentID 学生ID
	 * @return 成绩详细信息List
	 * @throws SQLException
	 */
	public List<ScoreDetail> getScoreByName(int studentID)throws SQLException{
		String sql = "select * from Score where studentID=? order by termID";
		stat = getInstance().prepareStatement(sql);
		stat.setInt(1, studentID);
		rs = stat.executeQuery();
		List<ScoreDetail> list = new LinkedList<ScoreDetail>();
		Map<Integer, ScoreDetail> map = new HashMap<Integer, ScoreDetail>();
		TermDao termDao = new TermDao();
		StudentDao studentDao = new StudentDao();
		while(rs.next()){
			int termID = rs.getInt(5);
			if(!map.containsKey(termID)){
				map.put(termID, new ScoreDetail());
				setValue(map.get(termID), rs.getInt(4), rs.getInt(6));
				map.get(termID).setTermName(termDao.getTermByID(termID).getTermDes());
				map.get(termID).setStudentName(studentDao.getStudentByID(rs.getInt(2)).getStudentName());
			}else{
				setValue(map.get(termID), rs.getInt(4), rs.getInt(6));
			}
		}
		this.close();
		for(Iterator<Integer> it = map.keySet().iterator(); it.hasNext();){
			list.add(map.get((Integer) it.next()));
		}
		
		return list;
	}
	
	/**
	 * 设置成绩到实例中
	 * @param scoreDetail
	 * @param subjectID
	 * @param score
	 */
	public void setValue(ScoreDetail scoreDetail, int subjectID, int score){
		if(subjectID == 1){
			scoreDetail.setChineseScore(score);
		}else if(subjectID == 2){
			scoreDetail.setMathScore(score);
		}else if(subjectID == 3){
			scoreDetail.setEnglishScore(score);
		}
	}
}
