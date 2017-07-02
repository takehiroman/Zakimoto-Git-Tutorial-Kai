package zakimotogit.git;


import java.io.File;
import java.io.IOException;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.internal.storage.file.FileRepository;
import org.eclipse.jgit.lib.Repository;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/init")
@EnableAutoConfiguration
public class initController {
	String ProjectDir = new File(".").getAbsoluteFile().getParent();
	String localPath = ProjectDir + "/target/test";
	

	
	@RequestMapping(method=RequestMethod.POST)
	public initDataModel repoCreate(initDataModel data) throws IOException {
		
	
	data.setlocalPath(localPath);
	
	Repository localRepo = new FileRepository(localPath + "/.git");
	data.setlocalRepo(localRepo);
	Git git = new Git(localRepo);
	data.setGit(git);
	System.out.println(data);
	
	return data;
	}
	
}
