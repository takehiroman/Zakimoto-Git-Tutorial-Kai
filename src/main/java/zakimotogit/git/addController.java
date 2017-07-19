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
	@RequestMapping(method=RequestMethod.PUT,value="{repositoryId}/add")
	public initDataModel add(@PathVariable String repositoryId,@RequestBody initDataModel data) throws IOException{
		try{
			data.setrepositoryId(data.getrepositoryId());
			data.add();
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		return data;
	}

}
