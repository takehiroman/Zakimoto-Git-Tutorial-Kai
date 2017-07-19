package zakimotogit.git;

import java.io.File;
import java.io.IOException;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

public class initDataModel {
	
	private String repositoryId;
	//private Path repositoryDir;
	private String commitMessage;
	String ProjectDir = new File(".").getAbsoluteFile().getParent();
	String localPath = ProjectDir + "/target/test";
	private Git git;
	
	
	public initDataModel(){
		super();
	}
	
	public void setrepositoryId(String repositoryId){
		this.repositoryId = repositoryId;
	}
	
	public void setcommitMessage(String commitMessage){
		this.commitMessage = commitMessage;
	}
	/*
	public void setrepositoryDir(Path repositoryDir){
		this.repositoryDir = repositoryDir;
	}
	*/
	/*
	public Path getrepositoryDir(){
		return repositoryDir;
	}
	*/
	public String getrepositoryId(){
		return repositoryId;
	}
	
	public String getcommitMessage(){
		return commitMessage;
	}
	public void init() throws IOException {

        Repository repo = this.createNewRepository();
        repo.create();


    }
	
	public void add() throws IOException, GitAPIException {
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		git.add().addFilepattern(".").call();
		
	}
	
	public void commit() throws IOException, GitAPIException{
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		git.commit().setMessage(commitMessage).call();
	}
	
	public Repository createNewRepository() throws IOException {
		Repository repo = new FileRepositoryBuilder()
	            .setGitDir(new File("repos/" + repositoryId + "/.git"))
	            .build();

        return repo;
    }
	
	
	@Override
    public String toString() {
        return String.format(
                "initData[localRepo='%s', localPath='%s']",
                repositoryId);
    }
}
