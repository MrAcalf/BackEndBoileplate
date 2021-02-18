# Back end Boilerplate

To run this project you will need docker container on localhost

Install Docker and after that run this command into your CLI

docker run --name your_container_name -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres

after that you will be able to send requests to your localhost vm using the ormconfig file
that is pre configured.

## Add your token

use the .env.example file to add your own secret token to encrypt your passwords.
after that rename the .env.example to .env
Do not send this file to yout online repository.
