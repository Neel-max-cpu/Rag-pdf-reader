# Stage 1: Build the jar using Maven
FROM maven:3.9.2-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies (cached)
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY backend/src ./src

# Build jar (skip tests to speed up)
RUN mvn clean package -DskipTests

# Stage 2: Run the jar using a smaller JDK
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render will override with $PORT)
EXPOSE 5001

# Run app with Render's dynamic port
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
