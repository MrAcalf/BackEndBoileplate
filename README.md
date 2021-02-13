# Back end Zukk Challenge

To run this project you will need docker container on localhost

Install Docker and after that run this command into your CLI

docker run --name zukk-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

after that you will be able to send requests to your localhost vm using the ormconfig file
that is pre configured.
