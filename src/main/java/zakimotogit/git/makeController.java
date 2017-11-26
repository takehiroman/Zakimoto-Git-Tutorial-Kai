package zakimotogit.git;

import java.io.IOException;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/make")
@EnableAutoConfiguration
public class makeController {
	@RequestMapping(method=RequestMethod.POST)
	public initDataModel create(@RequestBody initDataModel data) throws IOException{
		
		try {
			data.setfileName(data.getfileName());
			data.touch();
			data.setstatusMessage(data.getstatusMessage());
			data.status();
		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		
		
		data.setrepositoryId(data.getrepositoryId());
		
		return data;
	}
}
