FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /usr/src/app
COPY . .
RUN mvn package -Dmaven.test.skip

FROM openjdk:17-jdk
COPY --from=build /usr/src/app/target/web-app-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
