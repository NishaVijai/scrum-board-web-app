# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy .csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and publish
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ScrumBoardBackend.dll"]

