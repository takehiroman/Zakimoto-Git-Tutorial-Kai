package zakimotogit.git;


import java.io.IOException;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@EnableAutoConfiguration
public class makeController {
	
	//String ProjectDir = new File(".").getAbsoluteFile().getParent();
	//String localPath = ProjectDir + "/target/test";
	
	@RequestMapping(method=RequestMethod.POST,value="{repositoryDir}/make")
	public initDataModel create(@RequestBody initDataModel data) throws IOException{
		//String repoID = request.getRemoteAddr();
		//initDataModel repos = repositoryFactory.create(data.getrepositoryId());
		
		try {
			data.make_file();
			data.setstatusMessage(data.getstatusMessage());
			data.status();
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
				
		data.setrepositoryId(data.getrepositoryId());
		
		return data;
	}
}
