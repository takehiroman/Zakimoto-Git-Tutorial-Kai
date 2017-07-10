package zakimotogit.git;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.file.Paths;

@Component
public class initModelFactory {
	@Value("${zakimotogit.workbench.repository-dir}")
	private String gitDir;
	
	public initDataModel create(String repositoryId){
		System.out.println(gitDir);
		return new initDataModel(repositoryId,Paths.get(gitDir,repositoryId));
	}
}
