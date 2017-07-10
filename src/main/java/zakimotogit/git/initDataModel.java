package zakimotogit.git;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.StoredConfig;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

public class initDataModel {
	
	private String repositoryId;
	private Path repositoryDir;
	
	
	public initDataModel(String repositoryId, Path repositoryDir){
		this.repositoryId = repositoryId;
		this.repositoryDir = repositoryDir;
	}
	
	public void setrepositoryId(String repositoryId){
		this.repositoryId = repositoryId;
	}
	
	public void setrepositoryDir(Path repositoryDir){
		this.repositoryDir = repositoryDir;
	}
	
	public Path getrepositoryDir(){
		return repositoryDir;
	}
	
	public String getrepositoryId(){
		return repositoryId;
	}
	
	public void init() throws IOException {
        if (Files.exists(repositoryDir)) {
            throw new IOException("すでに存在している: " + repositoryId);
        }

        Files.createDirectories(repositoryDir);

        Repository repo = new FileRepositoryBuilder()
            .setGitDir(repositoryDir.toFile())
            .setBare()
            .build();
        final boolean isBare = true;
        repo.create(isBare);

        StoredConfig config = repo.getConfig();
        config.setBoolean("http", null, "receivepack", true);
        config.save();
    }

	
	@Override
    public String toString() {
        return String.format(
                "initData[localRepo='%s', localPath='%s']",
                repositoryId,repositoryDir);
    }
}
