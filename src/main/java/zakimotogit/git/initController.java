package zakimotogit.git;


import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.StoredConfig;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/init")
@EnableAutoConfiguration
public class initController {
	
	@Autowired
	HttpServletRequest request;
	
	//String ProjectDir = new File(".").getAbsoluteFile().getParent();
	//String localPath = ProjectDir + "/target/test";
	
	@RequestMapping(method=RequestMethod.POST)
	public initDataModel create(@RequestBody initDataModel data) throws IOException{
		//String repoID = request.getRemoteAddr();
		//initDataModel repos = repositoryFactory.create(data.getrepositoryId());
		
		try {
			data.init();
			data.setstatusMessage(data.getstatusMessage());
			data.status();
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		
		
		data.setrepositoryId(data.getrepositoryId());
		
		return data;
	}
}
