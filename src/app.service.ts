import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

async datasetCreate() {
  const {BigQuery} = require('@google-cloud/bigquery');
  // Creates a client
  const bigqueryClient = new BigQuery();

  const options = {
    location: 'US',
  };

  const [dataset] = await bigqueryClient.createDataset('my_new_dataset', options);
    console.log(`Dataset ${dataset.id} created.`);
  }

  async getUser(){
  
  //read data from spreadsheet
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const creds = require('C:/Users/desya/Downloads/virtus-platform-2be1302457ca.json');
  const doc = new GoogleSpreadsheet('19MMI8tSpnWcsFH60l8PQkyPYaOFafTm3wyx20rz825s');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  console.log(`Title: ${sheet.title}`);
  console.log(doc.loadInfo())

//read data from bigquery spreadsheet
  const options = {
    keyFilename: 'C:/Users/desya/Downloads/virtus-platform-2be1302457ca.json',
    projectId: 'virtus-platform',
    scopes:["https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/bigquery"]
  };

    const {BigQuery} = require('@google-cloud/bigquery')
    const bigquery = new BigQuery(options);
     // const dataset = bigquery.dataset('vpsql');
    // const destinationTable = dataset.table('M_USER');
    
    const query = `SELECT * FROM \`virtus-platform.vpsql.M_VTI_FORUM_DISCORD\``;
    // const query = `SELECT * FROM \`virtus-platform.vpsql.M_USER\``;
    const queryOptions = {
      query: query,
      location: 'US',
    };
    
    // create job
    const [job] = await bigquery.createQueryJob(queryOptions);
    console.log(job.id);
    
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
    
    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row));
    return rows;
  }
}
