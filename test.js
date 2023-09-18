import pg from 'pg';

// temporary... definitely temporary

// i'm going to be calling the main db "showy-db"
// my problem is: i can create that db on my machine and connect to it fine, but if i push this test.js file to github, that db isn't hosted on there
// so i'm trying to figure out how to get a db on that github

// as well as username, and password for the account connecting to the db
const client = new pg.Client( {
	database: 'showy-db',
	host: 'localhost',
	user: 'postgres',
	password: '1234',
	port: 5432,
});

// this will spit out an error that the db doesn't exist
await client.connect();
 
const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message);
await client.end();