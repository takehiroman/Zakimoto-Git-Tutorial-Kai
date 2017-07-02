package zakimotogit.git;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;

public class initDataModel {
	
	private String localPath;
	private Repository localRepo;
	private Git git;
	
	
	public initDataModel(){
		super();
	}
	

	
	public void setlocalPath(String localPath){
		this.localPath = localPath;
	}
	
	public void setlocalRepo(Repository localRepo){
		this.localRepo = localRepo;
	}
	
	public void setGit(Git git){
		this.git = git;
	}
	
	public Git getGit(){
		return git;
	}
	
	public Repository getlocalRepo(){
		return localRepo;
	}
	
	public String getlocalPath(){
		return localPath;
	}
	
	@Override
    public String toString() {
        return String.format(
                "initData[git=%s, localRepo='%s', localPath='%s']",
                git,localRepo,localPath);
    }
}
