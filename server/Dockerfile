# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Optional: disable IPv6 (if needed)
ENV DOTNET_SYSTEM_NET_DISABLEIPV6=1

# Copy project file & restore
COPY ScrumBoardBackend.csproj ./
RUN dotnet restore --disable-parallel -v diag

# Copy rest and publish
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ScrumBoardBackend.dll"]
