# Summary

This project creates a simple web application which mimics buying and selling some "stock".

# Pre-requisites

- Docker / Docker Desktop

# Usage

Note that the containers will evnetually **all** get their names from the `./infrastructure-code/terraform.tfvars` file. The below steps enumerate in more detail...

To provision the web application:

1. Run the `replace_in_code.sh` script in create mode. that is, type in `./replace_in_code.sh -c`. This does a find and replace, reading from `./infrastructure-code/terraform.tfvars` file and creates a new folder called `app-code` which houses all the code replaced by the correct names. The files that this script touches are:

   ```mermaid
   graph TD;

   script(replace_in_code.sh) --> app-code/backend/index.js
   script --> app-code/docker-compose.yml
   script --> app-code/frontend/package.json
   script --> app-code/frontend/nginx.conf
   ```

1. Change the working directory into `app-code` and run the `run.sh` script in create mode. That is type in `cd app-code && ./run.sh -c`. This will create the docker containers and start the application.
1. To test the application go to any browser and type in `localhost` and click around on some of the buttons!
