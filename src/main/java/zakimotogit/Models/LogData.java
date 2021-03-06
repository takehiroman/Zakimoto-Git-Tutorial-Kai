package zakimotogit.Models;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

public class LogData {
	@Id
	private String id;
	
	private SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
	private String number;
	private String command;
	private String address;
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss.SSS")
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
	
	public void setAddress(String address){
		this.address = address;
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
	
	public String getAddress(){
		return address;
	}
	
	@Override
    public String toString() {
        return String.format(
                "LogData[id=%s, number='%s', command='%s',logDate='%d',address='%s']",
                id, number, command,formatter.format(logDate),address);
    }

}
