FROM openjdk:11
WORKDIR /app
ARG JAR_FILE=./be/build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","app.jar"]