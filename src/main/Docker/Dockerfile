FROM gcr.io/google_appengine/openjdk8
VOLUME /tmp
ADD zakimoto-git-tutorial-kai-0.0.1-SNAPSHOT.jar app.jar
CMD [ "java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
