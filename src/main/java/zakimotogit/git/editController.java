package zakimotogit.git;

import java.io.IOException;

import org.eclipse.jgit.api.errors.GitAPIException;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class editController {
	@RequestMapping(method=RequestMethod.POST,value="{repositoryDir}/edit")
	public initDataModel edit(@PathVariable String repositoryDir,@RequestBody initDataModel data) throws IOException, GitAPIException{
			data.setrepositoryDir(data.getrepositoryDir());
			
			data.file_edit();
			data.setstatusMessage(data.getstatusMessage());
			data.status();
		return data;
	}
}
