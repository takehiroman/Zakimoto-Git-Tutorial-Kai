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
public class statusContoroller {
	@RequestMapping(method=RequestMethod.POST,value="{repositoryDir}/status")
	public initDataModel status(@PathVariable String repositoryDir,@RequestBody initDataModel data) throws IOException{
		try{
			data.setrepositoryDir(data.getrepositoryDir());
			data.setstatusMessage(data.getstatusMessage());
			data.status();
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		return data;
	}
}
