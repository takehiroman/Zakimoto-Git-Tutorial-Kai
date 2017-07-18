package zakimotogit.git;

import java.io.File;
import java.io.IOException;


import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

public class initDataModel {
	
	private String repositoryId;
	//private Path repositoryDir;
	String ProjectDir = new File(".").getAbsoluteFile().getParent();
	String localPath = ProjectDir + "/target/test";
	
	
	public initDataModel(){
		super();
	}
	
	public void setrepositoryId(String repositoryId){
		this.repositoryId = repositoryId;
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
	
	public void init() throws IOException {


        //Files.createDirectories(repositoryDir);

        Repository repo = new FileRepositoryBuilder()
            .setGitDir(new File("repos/" + repositoryId + "/.git"))
            .setBare()
            .build();
        final boolean isBare = true;
        repo.create(isBare);

    }
	
	
	@Override
    public String toString() {
        return String.format(
                "initData[localRepo='%s', localPath='%s']",
                repositoryId);
    }
}
