# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ScrumBoardBackend/ScrumBoardBackend.csproj ./ScrumBoardBackend/
RUN dotnet restore ./ScrumBoardBackend/ScrumBoardBackend.csproj

# Copy the rest and publish
COPY ScrumBoardBackend/ ./ScrumBoardBackend/
WORKDIR /src/ScrumBoardBackend
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ScrumBoardBackend.dll"]
