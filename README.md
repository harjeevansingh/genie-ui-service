Genie Chat Bot - Deployment guide



This guide explains how to deploy the Chat, History, Language Model and UI services using Docker Compose.

Repos -
Chat service - https://github.com/harjeevansingh/genie-chat-service 
History service - https://github.com/harjeevansingh/genie-history-service 
Language model service - https://github.com/harjeevansingh/genie-language-model-service 
UI service - https://github.com/harjeevansingh/genie-ui-service 

1. Prerequisites:
   1.1. Docker and Docker Compose installed on your system
   1.2. Ports 3306 (MySQL), 27017 (MongoDB), 6379 (Redis), 9092 (Kafka) should be available on your host machine
   1.3. OpenAI API key (Requires paid account at OpenAi)

2. Important Notes:
   2.1. These services will create containers for -
  	- MySQL (port 3306)
        	- Redis (port 6379)
  	- Kafka (port 9092)
     	- Zookeeper (port 2181)
- Chat Service (port 8080)
- History Service (port 8081)
 	- Language Model Service (port 8082)
	- UI (port 3000)

Note - Ensure these ports are not in use by existing installations on your host machine.

   2.2. Language Model Service uses a .env file for sensitive information. Ensure you have created these files with the necessary information before starting the services.

3. Deployment Sequence:

   3.1. Chat Service
        The Chat Service should be started first as it sets up shared resources like MySQL, Redis, and Kafka.

        3.1.1. Navigate to the Chat Service directory:
               cd /path/to/chat-service

        3.1.2. Start the service:
               docker-compose up -d

        3.1.3. This will create containers for:
               - MySQL (port 3306)
               - Redis (port 6379)
               - Kafka (port 9092)
               - Zookeeper (port 2181)
               - Chat Service (port 8080)

   3.2. History Service
        The History Service should be started after the Chat Service is up and running.

        3.2.1. Navigate to the History Service directory:
               cd /path/to/history-service

        3.2.2. Start the service:
               docker-compose up -d

        3.2.3. This will create containers for:
               - MongoDB (port 27017)
               - History Service (port 8081)

   3.3. Language Model Service
        The Language Model Service should be started last.

        3.3.1. Navigate to the Language Model Service directory:
               cd /path/to/language-model-service

        3.3.2. Create a .env file with the following content:
               OPENAI_API_KEY=your_openai_api_key_here
               Replace your_openai_api_key_here with your actual OpenAI API key.

        3.3.3. Start the service:
               docker-compose up -d

        3.3.4. This will create a container for:
               - Language Model Service (port 8082)

3.4. UI Service
        The UI Service should be started after all the backend services are up and running.

        3.2.1. Navigate to the History Service directory:
               cd /path/to/ui-service

        3.2.2. Start the service:
               docker-compose up -d

        3.2.3. This will create containers for:
               - UI (port 3000)

4. Verification:
   4.1. To verify that all services are running:
        docker ps
   4.2. You should see containers for all services and their dependencies.

5. Stopping the Services:
   5.1. To stop all services, run the following commands in each service directory:
        docker-compose down
   5.2. To stop all services and remove all data (including database data), use:
        docker-compose down -v

6. Troubleshooting:
   6.1. If services fail to start, check the logs using docker-compose logs [service_name].
   6.2. Ensure all required ports are available on your host machine.
   6.3. Verify that the .env files contain the correct information for Language Model service.
