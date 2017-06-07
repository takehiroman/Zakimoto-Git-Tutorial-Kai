package com.sample.jgit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@ComponentScan
@Controller
@EnableAutoConfiguration
public class ZakimotoGitTutorialKaiApplication {
	
	@RequestMapping(value="/",method=RequestMethod.GET)
	public ModelAndView index(ModelAndView mav){
		mav.setViewName("index");
		return mav;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(ZakimotoGitTutorialKaiApplication.class, args);
	}
	
}
