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
public class catController {
	@RequestMapping(method=RequestMethod.POST,value="{repositoryDir}/cat")
		public initDataModel cat(@PathVariable String repositoryDir,@RequestBody initDataModel data) throws IOException{
		try{
			data.setfileName(data.getfileName());
			data.setrepositoryDir(data.getrepositoryDir());
			data.setcatMessage(data.getcatMessage());
			data.file_cat();
				} catch(Exception ex){
					throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
			}	
			return data;
		}	
	
}

