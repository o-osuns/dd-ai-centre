# DD-AI-frontend-app

## Overview

This is the frontend that presents DD's AI.

## Getting Started

### Prerequisites

Recent versions of Docker and Docker-Compose are required for this project to run.

### Running the Service

1. Copy the sample environment variable file (.env.sample) to create an environment variable file for the application

```
cp .env.sample .env
```

2. start the docker container (it may build if the container does not exist). Ensure internet connection is enable for container build

```bash
docker-compose up --build -d
```

Open your favourite browser and navigate to localhost:80

## Built With

- Docker - Containerisation technology
- React - The Javascript framework technology

## License

This project is proprietary - see the [LICENSE.md](LICENSE.md) file for details
