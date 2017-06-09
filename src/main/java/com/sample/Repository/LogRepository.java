package com.sample.Repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sample.Models.MyDataMongo;



@Repository
public interface LogRepository extends MongoRepository<MyDataMongo, String> {
	public List<MyDataMongo> findAll();
	public MyDataMongo save(MyDataMongo data);
}
