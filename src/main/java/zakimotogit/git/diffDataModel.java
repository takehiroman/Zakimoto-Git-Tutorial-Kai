package zakimotogit.git;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.diff.DiffEntry;
import zakimotogit.git.initDataModel;

public class diffDataModel {
	
	private String repositoryDir;
	private OutputStream message;
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
	
	public void setMessage(OutputStream message){
		this.message = message;
	}
	
	public OutputStream getMessage(){
		return message;
	}
	
	public void diff() throws IOException, GitAPIException{
		initDataModel init = new initDataModel();
		Repository repo  = init.createNewRepository();
		git = new Git(repo);
		List<DiffEntry> diff = git.diff().call();
		
		for(DiffEntry entry : diff){
			System.out.println(entry);
		}
		
		//git.diff().setOutputStream(this.getMessage()).call();
	}
}
