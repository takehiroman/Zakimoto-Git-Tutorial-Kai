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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.commons.codec.digest.DigestUtils;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.api.errors.ConcurrentRefUpdateException;
import org.eclipse.jgit.api.errors.EmtpyCommitException;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.NoMessageException;
import org.eclipse.jgit.api.errors.WrongRepositoryStateException;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	private String fileName;
	private static final DateFormat formatter = new SimpleDateFormat("HH:mm:ss");
	private Date time = new Date();
	
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
	
	public void setfileName(String fileName){
		this.fileName = fileName;
	}
	
	
	public String getfileName(){
		return fileName;
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
	
	public void touch() throws IOException {

        Repository repo = this.createNewRepository();        
        
        try(Git git = new Git(repo)){
     // ファイルを生成
        File myfile = new File(repo.getDirectory().getParent(), fileName);
        if(!myfile.createNewFile()) {
            throw new IOException("Could not create file " + myfile);
        }
        }catch(IOException e){
        	System.out.println(e);
        }


    }
	
	public void add() throws Exception, GitAPIException {
		Repository repo = this.createNewRepository();
		try(Git git = new Git(repo)){
			if(git != null){
			git.add().addFilepattern(fileName).call();
			}
		}
		
	}
	
	public void commit() throws Exception, GitAPIException{
		Repository repo = this.createNewRepository();
		git = new Git(repo);
		try {
		git.commit().setMessage(commitMessage).call();
		} catch (EmtpyCommitException e) {
			e.printStackTrace();
		}catch( ConcurrentRefUpdateException e ){
		      e.printStackTrace();
		}catch( WrongRepositoryStateException e ){
		      e.printStackTrace();
		}
    }
	
	public void file_edit() throws IOException {
		Repository repo = this.createNewRepository();
		//ファイルの書き換え
		Path path = Paths.get(repo.getDirectory().getParent(),fileName);
			if(Files.exists(Paths.get(repo.getDirectory().getParent(),fileName))){
				try(BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)){
					writer.append("Modified time is " + formatter.format(time));
					writer.newLine();
				}	
				catch(IOException e){
					System.out.println(e);
				}
			}
	}
	
	public void file_cat() throws IOException {
		Repository repo = this.createNewRepository();
		String strFile = "";
		//ファイルの読み込み
		Path path = Paths.get(repo.getDirectory().getParent(),fileName);
		
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
		}
		lsMessage = filename;
	}
	
	public void file_delete() throws IOException{
		Repository repo = this.createNewRepository();
		//ファイルの削除
//		
		Path path = Paths.get(repo.getDirectory().getParent(),fileName);
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
		git.rm().addFilepattern(fileName).call();
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
            strStatus += "new file:" + status.getAdded() + "\n";
        }
        if (!status.getChanged().isEmpty()) {
            strStatus += "Changed:" + status.getChanged() + "\n";
        }
        if (!status.getMissing().isEmpty()) {
            strStatus += "deleted:" + status.getMissing() + "\n";
        }
        if (!status.getModified().isEmpty()) {
            strStatus += "Modified:" + status.getModified() + "\n";
        }
        if(!status.getRemoved().isEmpty()){
        	strStatus += "Removed:" + status.getRemoved() + "\n";
        }
        if (!status.getUntracked().isEmpty()) {
            strStatus += "Untracked:" + status.getUntracked() + "\n";
        }
        System.out.println(strStatus);
        System.out.println(status.toString());
        statusMessage = strStatus;
		
	}
	
	public Repository createNewRepository() throws IOException {
		
		String hexString = DigestUtils.md5Hex(repositoryDir);
		Repository repo = new FileRepositoryBuilder()
	            .setGitDir(new File("repos/" + hexString + "/.git"))
	            .build();

        return repo;
    }
	/*
	public void make_dir() throws IOException {
		String hexString = DigestUtils.md5Hex(repositoryDir);
		File newDir = new File("repos/"+hexString);
		newDir.mkdir();
	}
	*/
	
	
	@Override
    public String toString() {
        return String.format(
                "initData[localRepo='%s', localPath='%s']",
                repositoryId);
    }
}
