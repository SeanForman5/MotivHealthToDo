# MotivHealthToDo

# To-Do App

A full-stack to-do list application built for a Senior Full Stack Engineer interview.

## Tech Stack

- Frontend: Angular with Ionic responsive components
- Backend: .NET Standard 8 Web API
- Database: PostgreSQL
- Containerization: Docker and Docker Compose
- CI: GitHub Actions on Windows

## Project Structure

- `MotivHealthToDoWeb/` - Angular frontend
  - Uses `BehaviorSubject` for state management
  - Adding, deleting, sorting, and marking tasks complete
  - Supports mock and real API clients
- `MotivHealthToDoApi/` - .NET Web API
  - Controller and service logic separated by concern
  - Restful service, scalable and containerized
- `MotivHealthToDoCore/` - Service and Data Access Layer
  - Uses Entity Framework Core with Code First Migrations
  - Database connection configured via environment variables

## Docker

- `Dockerfile` and `Dockerfile.prod` for dev and production builds
- `docker-compose.yml` for development
- `docker-compose.prod.yml` for production
- Angular app is served via NGINX in production

## CI with GitHub Actions

- Runs on `windows-latest`
- Builds and tests the .NET API
- Builds and tests the Angular app
- Code coverage enabled
- Uses mock services for testing (no containerized Postgres in CI/CD)

## Design Highlights

- Mobile-friendly design with Ionic components
- Dev workflow supports hot reload (`dotnet watch`, `ng serve`)
- Angular client architecture allows easy mocking for working offline and writing tests
- Sort preference is cached in local storage

## Notes

- Single-user only (no login/authentication)
- Sorting is handled client-side
- Basic error handling
- Password in docker compose, would normally be removed to Github secret, or Azure Key vault on run

## Things not included
- Server side filtering/sorting
- Logging with NLog or similar
- Front end niceties like error toasts, loading icons
- Batteries


## Deployment plan
- Deploy docker images to a container registry like Azure CR with Github Actions
    docker push myregistry.azurecr.io
- Configure staging slots and production slots
- Apply scaling sets to production slots
- Allow hot swaps from staging slots to production after verification
- Monitor request times with New Relic or Application Insights
