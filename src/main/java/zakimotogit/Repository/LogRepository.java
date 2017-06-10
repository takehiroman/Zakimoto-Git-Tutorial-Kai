package zakimotogit.Repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import zakimotogit.Models.LogData;

@Repository
public interface LogRepository extends MongoRepository<LogData, String> {
	public List<LogData> findAll();
	public LogData save(LogData data);
}
