import * as dotenv from 'dotenv';
dotenv.config(); // look at the .env file, get every single env variable, load them in our environment

import config from './config';
import app from "./server";

app.listen(config.port, () => {
    console.log(`server on http://localhost:${config.port}`);
})

// the terminal is not closing, it is always on
// event driven architecture
// res object is scoped to the incoming request
// api is the code that runs on the server
// route is combination of url path and an http method
// api server is event based application

//===========================  =====================================================//
// ORM
// how you interact with database -> ORM (sdk for the db) object relation mapper
// Prisma db agnostic, typesafe ORM

// process represents the current process that we are 
// currently in (the fs, the current file, all the variables, the secrets..., the hardware)
// the process is what is running in the environment