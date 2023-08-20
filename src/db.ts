//allows us to work with Microsoft SQL server databases
import {ConnectionPool, config} from 'mssql'

//holds settings required to connect to sql server database
//defines a configuration object dbConfig that holds objects required to connect to sql server database
const dbConfig:config={
    //proprties specifiing login credentials and server info for the database
    //process.env - specifies environment variables
    user:process.env.DB_USER || 'sa',
    password:process.env.DB_PASSWORD || 'N10234424008s',
    server:process.env.SERVER || 'localhost',
    database:process.env.DB_NAME || 'BookStoreApi',
    options: {
        // Disable SSL encryption
        encrypt: false 
      }
}


//creates an instance of connection pool
//ConnectionPool - a set of connections that can be reused
const pool = new ConnectionPool(dbConfig);

// pool.connect().catch(err=>console.error("Database connection error",err));

//initiate connection to the database using connection pool
//returns a promise
pool.connect()
//if connection is successful, then block is executed
.then(()=>{
    console.log("Connected to the database")
}).catch(err=>{
    console.error("Database conection error",err)
})


//makes pool available to the rest of the application
export default pool;