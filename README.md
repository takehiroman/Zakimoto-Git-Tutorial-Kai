# Zakimoto-Git-Tutorial-Kai

* 利用しているツール，ライブラリ

*  バックエンド  
  * Java
  * Spring boot
  
* フロントエンド
  * jQuery
  * jQuery-console
  
* データベース
  * MongoDB  

* ビルドツール
	* Maven	 

### 実行方法

* MongoDBの起動

```
mongod
```

* 実行可能jarの作成

```
./mvnw clean package
```

* jarの実行コマンド

```
java -jar target/zakimoto-git-tutorial-kai-0.0.1-SNAPSHOT.jar 
```


### 

### 実装予定機能

* トップ画面
    * Todoリスト一覧
    * Todoリストの作成

* Todo詳細画面
    * Todoの表示
    * Todo追加
    * Todoの状態変更

* 検索画面
    * Todoの検索

    
    app.post('/api/todos/todo',(request,response) => {
        const {todo,limitDay} = request.body
        const timestamp = dateFormat(new Date(),"yyyy/mm/dd")
    
    new Todo({
            todo,
            createDay,
            limitDay,
    }).save(err => {
        if(err) response.status(500)
            else {
                TodoList.find({},(findErr,todoArray) => {
                    if(findErr) response.status(500).send()
                        else response.status(200).send(todoArray)
                })  
            }
    })
    })