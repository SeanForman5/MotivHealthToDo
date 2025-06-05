# Development Dockerfile for .NET API
FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app
COPY . ./
RUN dotnet restore

EXPOSE 80
CMD ["dotnet", "watch", "run", "--urls=http://0.0.0.0:80"]