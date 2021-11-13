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
    const {BigQuery} = require('@google-cloud/bigquery')
    const bigquery = new BigQuery();
     // const dataset = bigquery.dataset('vpsql');
    // const destinationTable = dataset.table('M_USER');
    
    // const query = `SELECT * FROM \`virtus-platform.testsing_googlesheet.data_penjualan\``;
    const query = `SELECT * FROM \`virtus-platform.vpsql.M_USER\``;
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
