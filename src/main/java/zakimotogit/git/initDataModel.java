package zakimotogit.git;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

public class initDataModel {
	
	private String repositoryId;
	private String repositoryDir;
	private String commitMessage;
	private String diffMessage;
	private String number;
	private Git git;
	
	
	public initDataModel(){
		super();
	}
	
	public void setrepositoryId(String repositoryId){
		this.repositoryId = repositoryId;
	}
	
	public void setcommitMessage(String commitMessage){
		this.commitMessage = commitMessage;
	}
	
	public void setdiffMessage(String diffMessage){
		this.diffMessage = diffMessage;
	}
	
	public void setrepositoryDir(String repositoryDir){
		this.repositoryDir = repositoryDir;
	}
	
	public void setNumber(String number){
		this.number = number;
	}
	
	
	public String getrepositoryDir(){
		return repositoryDir;
	}
	
	public String getrepositoryId(){
		return repositoryId;
	}
	
	public String getcommitMessage(){
		return commitMessage;
	}
	
	public String getdiffMessage(){
		return diffMessage;
	}
	
	public String getNumber(){
		return number;
	}
	
	public void init() throws IOException {

        Repository repo = this.createNewRepository();        
        repo.create();
        
     // ファイルを生成
        File myfile = new File(repo.getDirectory().getParent(), "README.md");
        if(!myfile.createNewFile()) {
            throw new IOException("Could not create file " + myfile);
        }
        //ファイルの書き込み
        BufferedWriter writer = null;
        try{
        	writer = new BufferedWriter(new OutputStreamWriter(
        			new FileOutputStream(myfile),"UTF-8"));
        	writer.append("Hello git World");
        	writer.newLine();
        }catch(IOException e){
        	System.out.println(e);
        }finally{
        	if(writer != null ){
        		writer.close();
        	}
        }


    }
	
	public void add() throws IOException, GitAPIException {
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		git.add().addFilepattern(".").call();
		
	}
	
	public void commit() throws IOException, GitAPIException{
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		git.commit().setMessage(commitMessage).call();
		
		
	}
	
	public void file_edit() throws IOException {
		Repository repo = this.createNewRepository();
		//ファイルの書き換え
		Path path = Paths.get(repo.getDirectory().getParent(),"README.md");
			try(BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)){
				writer.append("file changed");
					writer.newLine();
				}	
			catch(IOException e){
				System.out.println(e);
			}
	}
	
	public void file_delete() throws IOException{
		Repository repo = this.createNewRepository();
		//ファイルの削除
		Path path = Paths.get(repo.getDirectory().getParent(),"README.md");
			try{
				Files.delete(path);
			}catch(IOException e){
				System.out.println(e);
			}
	}
	
	public void diff() throws IOException, GitAPIException{
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		OutputStream out = new ByteArrayOutputStream();
		git.diff().setOutputStream(out).call();
		diffMessage = out.toString();
		System.out.println(diffMessage);

	}
	
	public void status() throws IOException, GitAPIException{
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		Status status = git.status().call();
		System.out.println(status.getUntracked());
		System.out.println(status.getChanged());
		
	}
	
	public Repository createNewRepository() throws IOException {
		
		String hexString = DigestUtils.md5Hex(repositoryDir);
		Repository repo = new FileRepositoryBuilder()
	            .setGitDir(new File("repos/" + hexString + "/.git"))
	            .build();

        return repo;
    }
	
	
	@Override
    public String toString() {
        return String.format(
                "initData[localRepo='%s', localPath='%s']",
                repositoryId);
    }
}
