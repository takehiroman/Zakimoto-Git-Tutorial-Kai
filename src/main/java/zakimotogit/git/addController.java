package zakimotogit.git;

import java.io.IOException;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class addController {
	@RequestMapping(method=RequestMethod.PUT,value="{repositoryDir}/add")
	public initDataModel add(@PathVariable String repositoryDir,@RequestBody initDataModel data) throws IOException{
		try{
			data.setrepositoryDir(data.getrepositoryDir());
			data.add();
			data.setstatusMessage(data.getstatusMessage());
			data.status();
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		return data;
	}

}
