import {ConnectionPool, config} from 'mssql'

const dbConfig:config={
    user:process.env.DB_USER || 'sa',
    password:process.env.DB_PASSWORD || 'N10234424008s',
    server:process.env.SERVER || 'localhost',
    database:process.env.DB_NAME || 'BookStoreApi',
    options: {
        encrypt: false // Disable SSL encryption
      }
}

const pool = new ConnectionPool(dbConfig);

// pool.connect().catch(err=>console.error("Database connection error",err));
pool.connect()
.then(()=>{
    console.log("Connected to the database")
}).catch(err=>{
    console.error("Database conection error",err)
})

export default pool;