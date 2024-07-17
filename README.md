# Genie Chat Bot - UI Service

## Project Description
Genie Chat Bot is an AI-powered chatbot system providing instant lending-related query resolution. It supports multiple concurrent user sessions with real-time responses and comprehensive conversation history storage. The system is built using a microservices architecture for scalability and efficient query resolution.

## UI Service Description
The UI Service provides the user interface for the Genie Chat Bot. It's a React-based frontend that allows users to interact with the chatbot, send messages, and view responses in real-time.

## Dependencies
Before running the UI Service, ensure the following repositories are cloned and their services are running:
- Chat Service: https://github.com/harjeevansingh/genie-chat-service
- History Service: https://github.com/harjeevansingh/genie-history-service
- Language Model Service: https://github.com/harjeevansingh/genie-language-model-service

## Prerequisites
- Docker and Docker Compose installed on your system
- Port 3000 should be available
- All backend services (Chat, History, and Language Model) should be up and running

## Steps to Run
1. Navigate to the UI Service directory:
       cd /path/to/genie-ui-service
2. Start the service:
       docker-compose up -d
3. Verify that the service is running:
       docker ps
4. Access the UI in your web browser at `http://localhost:3000`

For full deployment of the Genie Chat Bot system, refer to the main deployment guide.
       https://docs.google.com/document/d/1UWd703j5do7ilt7zrmmJodJIY9KydrCAX3lkqXyKH2w/edit