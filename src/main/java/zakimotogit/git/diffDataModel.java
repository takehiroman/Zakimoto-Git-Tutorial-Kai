package zakimotogit.git;

import java.io.IOException;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import zakimotogit.git.initDataModel;

public class diffDataModel {
	
	private String repositoryDir;
	private Git git;
	
	
		
	public diffDataModel(){
		super();
	}
	
	public void setrepositoryDir(String repositoryDir){	
		this.repositoryDir = repositoryDir;
	}
	
	public String getrepositoryDir(){
		return repositoryDir;
	}
	
	public void diff() throws IOException, GitAPIException{
		initDataModel init = new initDataModel();
		Repository repo  = init.createNewRepository();
		git = new Git(repo);
		git.diff().setOutputStream(System.out).call();
	}
}
