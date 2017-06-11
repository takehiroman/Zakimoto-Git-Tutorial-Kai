package zakimotogit.Models;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.data.annotation.Id;

public class LogData {
	@Id
	private String id;
	
	private static final DateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
	
	private String number;
	private String command;
	private Date logDate = new Date();
	
	
	public LogData(){
		super();
	}
	
	public void setId(String id){
		this.id = id;
	}
	
	public void setNumber(String number){
		this.number = number;
	}
	
	public void setCommand(String command){
		this.command = command;
	}
	
    public String getId() {
		return id;
	}
	
	public String getNumber(){
		return number;
	}
	
	public String getCommand(){
		return command;
	}
	
	public Date getLogDate() {
		return logDate;
	}
	
	@Override
    public String toString() {
        return String.format(
                "LogData[id=%s, number='%s', command='%s',logDate='%d']",
                id, number, command,formatter.format(logDate));
    }

}
