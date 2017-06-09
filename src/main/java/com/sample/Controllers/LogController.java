package com.sample.Controllers;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sample.Models.MyDataMongo;
import com.sample.Repository.LogRepository;




@RestController
@RequestMapping("/store")
public class LogController {
	
	@Autowired
	LogRepository repository;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<MyDataMongo> getAllLog() {
		return repository.findAll();
	}

	@RequestMapping(method=RequestMethod.POST)
	public MyDataMongo createLog(@Valid @RequestBody MyDataMongo data){
		return repository.save(data);
	}
	
}
