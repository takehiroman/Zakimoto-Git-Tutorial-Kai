package zakimotogit.Models;
import org.springframework.data.annotation.Id;

public class LogData {
	@Id
	private String id;
	
	private String number;
	private String command;
	
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
	
	@Override
    public String toString() {
        return String.format(
                "LogData[id=%s, number='%s', command='%s']",
                id, number, command);
    }

}
