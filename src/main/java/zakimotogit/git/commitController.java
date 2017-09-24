package zakimotogit.git;

import java.io.IOException;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/commit")
@EnableAutoConfiguration
public class commitController {
	

	@RequestMapping(method=RequestMethod.POST)
	public initDataModel create(@RequestBody initDataModel data) throws IOException{
		try {
			data.setrepositoryDir(data.getrepositoryDir());
			data.setcommitMessage(data.getcommitMessage());
			data.setNumber(data.getNumber());
			data.commit();
			
			if(data.getNumber().equals("3")){
				data.file_edit();
				data.diff();
			}else{
				data.file_delete();
				data.diff();
			}
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		return data;
	}
}
