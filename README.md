# JWT_Assignment

This is group 7's submission on JWT assignment.

Group 7 :
Jason Christian
Kevin Herman Otnieliem
Nicholas Arthur

# Usage

Have Node and NPM (Node Package Manager) installed. This uses NPM to manage all the dependencies needed for development and deployment.

Clone repository and go to the directory
```bash
git clone https://github.com/kevinherman1104/JWT_Assignment.git
cd JWT_Assignment
```

Download and install dependencies
```bash
npm install
```

Run the development server
```bash
npm run start
```

Next, open a new terminal/command prompt (while still running the port) <br />NOTE: DO NOT CLOSE THE PORT!!<br />
In the new terminal, type the command below to get the authentication code:
```bash
curl -d "username=nakamarusun&id=1&password=bruh" -X POST http://localhost:8080/login
```
After you get the code, type the command below:
```bash
curl -H 'Accept: application/json' -H "Authorization: Bearer #TOKEN" http://localhost:8080/api/venues/
```
NOTE: replace THE #TOKEN with the authentiaction token you get from the previous command.

