package com.sample.Models;
import org.springframework.data.annotation.Id;

public class MyDataMongo {
	@Id
	private String id;
	
	private String number;
	private String command;
	
	public MyDataMongo(){
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
	
	

}
