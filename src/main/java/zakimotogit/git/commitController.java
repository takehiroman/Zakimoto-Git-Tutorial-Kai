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
			data.setstatusMessage(data.getstatusMessage());
			data.status();

		} catch(Exception ex){
			throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
		}
		return data;
	}
}
