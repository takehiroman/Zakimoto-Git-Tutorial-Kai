
	package zakimotogit.git;

	import java.io.IOException;

	import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestMethod;
	import org.springframework.web.bind.annotation.RestController;

	@RestController
	@RequestMapping("/")
	@EnableAutoConfiguration
	public class dirController {
		@RequestMapping(method=RequestMethod.POST)
		public initDataModel create(@RequestBody initDataModel data) throws IOException{
			
			try {
				//data.make_dir();
			} catch(Exception ex){
				throw new RuntimeException("ApplicationStartup::createDirectories: ", ex);
			}
			
			
			data.setrepositoryId(data.getrepositoryId());
			
			return data;
		}
	}
	

