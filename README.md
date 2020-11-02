# MicroServicesBlog

1 Data is the big challenge in microservices.

2 Using async communication to share data between services.

3 Async communication focuses on communicating changes using events sent to an event bus.

4 Async communication encourages each service to be 100% self-sufficient. Relatively easy to handle temporary downtime or new service creation.

5 Docker makes it easier to package up services.

6 Kubernetes is a pain to setup, but makes it really easy to deploy + scale services.

7 Skaffold handles the workflow for building, pushing, and deploying your application, and provides building blocks for creating CI/CD pipelines.

Next:

1. Build a central library as an NPM module to shar code between our different projects.

2. Precisely define all of our events in this ahared library.

3. Write everything in Typescript.

4. Write tests for as much as possible/reasonable

5. Run a k8s cluster in the cloud and develop on it almost as quickly as local

6. Introduce a lot of code to handle concurrency issues.
