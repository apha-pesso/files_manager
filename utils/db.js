// DBClient class
import { MongoClient } from 'mongodb';

// Create the DBclient class
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
	  this.status = false;
    this.connect();
  }

  // Create async connnection function, to be called in the constructor
  async connect() {
    try {
      await this.client.connect();
      this.status = true;
      // console.log('Connected successfuly');
    } catch (error) {
      console.log('Error', error);
    }
  }

  // returns connection status
  isAlive() {
	  return this.status;
  }

  // returns number of users
  async nbUsers() {
    const nbUsers = await this.client
      .db('files_manager')
      .collection('users')
      .countDocuments();
    return nbUsers;
  }

  // return number of files in the collection
  async nbFiles() {
    const nbFiles = await this.client
      .db('files_manager')
      .collection('files')
      .countDocuments();
    return nbFiles;
  }

  // Search for email in database
  async emailCheck(mail) {
    const user = await this.client.db('files_manager').collection('users').countDocuments({ email: mail });
    if (user) {
      return true;
    }
    return false;
  }

  // Add users to the database
  async addUser(email, password) {
    // console.log('bafore add');
    const status = await this.client.db('files_manager').collection('users').insertOne({ email, password });
    // console.log('after');
    return (status.insertedId);
  }
}

// create and export BDclient instance
const dbClient = new DBClient();
module.exports = dbClient;
