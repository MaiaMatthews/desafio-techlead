FROM maven:3.9.7-sapmachine-17 as build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
FROM openjdk:17-jdk-alpine
COPY --from=build /app/target/biblioteca-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/biblioteca-0.0.1-SNAPSHOT.jar"]