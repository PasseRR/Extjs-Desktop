package csii.dao;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Properties;
/**
 * JDBC基础连接类
 * @author xiehai
 * @date 2013-6-28 上午10:50:13 	
 */
public class BaseConnection {
	Connection conn = null;
	PreparedStatement stat = null;
	ResultSet rs = null;
	
	/**
	 * 获取Connection实例
	 * @return
	 */
	public Connection getInstance(){
		String fileName = "datasource.properties";
		InputStream is = BaseConnection.class.getResourceAsStream("../config/"+fileName);
		Properties pro = new Properties();
		try{
			//读取properties文件数据
			pro.load(is);
			Class.forName(pro.getProperty("driver"));
			//com.mysql.jdbc.Driver driver = new com.mysql.jdbc.Driver();
			//new com.mysql.jdbc.Driver();
			conn = DriverManager.getConnection(pro.getProperty("url"), pro.getProperty("user"), pro.getProperty("password"));
			return conn;
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println("数据库驱动加载出错!");
			return null;
		}
	}
	
	/**
	 * 释放资源
	 * @throws SQLException
	 */
	public void close() throws SQLException{
		try{
			if(rs != null){
				rs.close();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try{
			if(stat != null){
				stat.close();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		try{
			if(conn != null){
				conn.close();
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//测试Properties
	public static void main(String[] args) {
		String fileName = "datasource.properties";
		InputStream is = BaseConnection.class.getResourceAsStream("../config/"+fileName);
		Properties pro = new Properties();
		try{
			pro.load(is);
			pro.list(System.out);
			
			System.err.println("-- listing properties --");
			for(Iterator<Object> it = pro.keySet().iterator(); it.hasNext();){
				String key = (String) it.next();
				String value = (String)pro.get(key);
				System.out.println(key + "->" + value);
			}
		}catch (Exception e) {
		}
	}
}
