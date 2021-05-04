# JWT_Assignment

This is group 7's submission on JWT assignment.

Group 7 :<br />
Jason Christian<br />
Kevin Herman Otnieliem<br />
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
You will get something like this:
![image](https://user-images.githubusercontent.com/57943690/117020614-cd4f0a00-ad20-11eb-9acf-6377fc8acf91.png)

After you get the code, type the command below:
```bash
curl -H 'Accept: application/json' -H "Authorization: Bearer #TOKEN" http://localhost:8080/api/venues/
```
NOTE: replace The #TOKEN with the authentiaction token you get from the previous command.<br />
You will get this output:
![image](https://user-images.githubusercontent.com/57943690/117020927-11420f00-ad21-11eb-94f9-64f74124b6da.png)


