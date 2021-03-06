package zakimotogit.git;

import java.io.BufferedReader;
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

import org.apache.commons.codec.digest.DigestUtils;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

public class initDataModel {
	
	private String repositoryId;
	private String repositoryDir;
	private String commitMessage;
	private String diffMessage;
	private String statusMessage;
	private String catMessage;
	private String lsMessage;
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
	
	public void setstatusMessage(String statusMessage){
		this.statusMessage = statusMessage;
	}
	
	public void setcatMessage(String catMessage){
		this.catMessage = catMessage;
	}
	
	public void setlsMessage(String lsMessage){
		this.lsMessage = lsMessage;
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
	
	public String getstatusMessage(){
		return statusMessage;
	}
	
	public String getcatMessage(){
		return catMessage;
	}
	
	public String getlsMessage(){
		return lsMessage;
	}
	
	public String getNumber(){
		return number;
	}
	
	public void init() throws IOException {

        Repository repo = this.createNewRepository();        
        repo.create();
        
    }
	
	public void make_file() throws IOException {
		Repository repo = this.createNewRepository();
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
		git.add().addFilepattern("README.md").call();
		
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
	
	public void file_cat() throws IOException {
		Repository repo = this.createNewRepository();
		String strFile = "";
		//ファイルの読み込み
		Path path = Paths.get(repo.getDirectory().getParent(),"README.md");
		
		try(BufferedReader reader = Files.newBufferedReader(path,StandardCharsets.UTF_8)){
			for (String line;(line = reader.readLine()) != null;){
				strFile += line;
				System.out.println(line);
			}
			catMessage = strFile;
			
		}catch(IOException ex){
			System.err.println(ex);
		}
	}
	
	public void file_ls() throws IOException {
		Repository repo = this.createNewRepository();
		File myfile = new File(repo.getDirectory().getParent());
		String filename  = "";
		
		File[] files = myfile.listFiles();
		for(int index = 0;index < files.length;index ++){
			File item = files[index];
			if(item.isFile()){
				System.out.println(item.getName());
				filename += item.getName();
			}
			System.out.println("[12][" + myfile + "]はディレクトリでもファイルでもありません");
		}
		lsMessage = filename;
	}
	
	public void file_delete() throws IOException{
		Repository repo = this.createNewRepository();
		//ファイルの削除
//		
		Path path = Paths.get(repo.getDirectory().getParent(),"README.md");
			try{
			Files.delete(path);
			}catch(IOException e){
				System.out.println(e);
			}
//			

	}
	
	public void remove() throws IOException, GitAPIException{
		Repository repo = this.createNewRepository();
		
		git = new Git(repo);
		git.rm().addFilepattern("README.md").call();
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
		String strStatus = "";
        if (!status.getAdded().isEmpty()) {
            strStatus += "new file: " + status.getAdded();
        }
        if (!status.getChanged().isEmpty()) {
            strStatus += "Changed: " + status.getChanged();
        }
        if (!status.getMissing().isEmpty()) {
            strStatus += "deleted: " + status.getMissing();
        }
        if (!status.getModified().isEmpty()) {
            strStatus += "Modified: " + status.getModified();
        }
        if(!status.getRemoved().isEmpty()){
        	strStatus += "Removed:" + status.getRemoved();
        }
        if (!status.getUntracked().isEmpty()) {
            strStatus += "Untracked: " + status.getUntracked();
        }
        System.out.println(strStatus);
        statusMessage = strStatus;
		
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
