package zakimotogit.git;

public class initDataModel {

	private String ProjectId;
	private String ProjectDir;
	
	public initDataModel(){
		super();
	}
	
	public void setProjectId(String ProjectId){
		this.ProjectId = ProjectId;
	}
	
	public void setProjectDir(String ProjectDir){
		this.ProjectDir = ProjectDir;
	}
	
	public String getProjectId(){
		return ProjectId;
	}
	
	public String getProject(){
		return ProjectDir;
	}
}
