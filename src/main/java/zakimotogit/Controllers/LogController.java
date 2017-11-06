package zakimotogit.Controllers;

import java.util.List;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import zakimotogit.Models.LogData;
import zakimotogit.Repository.LogRepository;




@RestController
@RequestMapping("/store")
@EnableAutoConfiguration
public class LogController {
	
	@Autowired
	LogRepository repository;
	
	@Autowired
	HttpServletRequest request;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<LogData> getAllLog() {
		return repository.findAll();
	}

	@RequestMapping(method=RequestMethod.POST)
	public LogData createLog(@Valid @RequestBody LogData data){
		return repository.save(data);
	}
	
	
}
