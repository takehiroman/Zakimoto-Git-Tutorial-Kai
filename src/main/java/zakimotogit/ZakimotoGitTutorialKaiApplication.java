package zakimotogit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@Controller
public class ZakimotoGitTutorialKaiApplication {
	
	
	public static void main(String[] args) {
		SpringApplication.run(ZakimotoGitTutorialKaiApplication.class, args);
	}
	
	
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public ModelAndView index(ModelAndView mav){
		mav.setViewName("index");
		return mav;
	}
	
}
