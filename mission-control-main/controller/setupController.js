const chalk = require('chalk');
const setup = require('../model/setup');
const account = require('../model/account');
const user = require('../model/user');
const utility = require('../model/utilities');
const backendSettings = require('../config/default');
const frontendSettings = require('../client/src/settings.json');

/*
* setup.database()
* get the database settings
*/

exports.database = async function(req, res){
  
  return res.status(200).send({ data: {

    client: process.env.DB_CLIENT,
    connection: {

      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME

    }
  }});
}

/*
* setup.database.update()
* configure the database settings
*/

exports.database.update =  async function(req, res){

  let settings = { client: req.body.client }
  delete req.body.client;
  settings.connection = req.body;

  if (settings.client === 'mongo'){

    await setup.database.mongo();
    await setup.package(null, ['mysql', 'knex']); // clean package.json

  }
  else {

    settings.connection.ssl = { rejectUnauthorized: false };
    await setup.database.sql(settings);
    await setup.package(null, ['mongodb', 'mongoose', 'express-mongo-sanitize']); // clean package.json

  }

  await setup.env('DB_CLIENT', settings.client);
  await setup.env('DB_USER', settings.connection.user);
  await setup.env('DB_PASSWORD', settings.connection.password);
  await setup.env('DB_HOST', settings.connection.host);
  await setup.env('DB_NAME', settings.connection.database);
  await setup.env('DB_PORT', settings.connection.port);

  console.log(chalk.green('Connected to database'));
  return res.status(200).send({ message: 'Connected to database' });

};

/*
* setup.stripe()
* get the stripe settings
*/

exports.stripe = async function(req, res){

  let settings = backendSettings.stripe;
  settings.publishableAPIKey = frontendSettings.development.stripe.publishableAPIKey;
  return res.status(200).send({ data: settings });

};

/*
* setup.stripe.update()
* save stripe settings
*/

exports.stripe.update = async function(req, res){

  const data = req.body;
  utility.validate(data, ['test_sk']);

  // save keys
  await setup.env('STRIPE_SECRET_API_KEY', data.test_sk || data.live_sk); 
  
  // save plans
  const testconfig = await setup.stripe(data.test_sk, data.freePlan);  
  await setup.settings('stripe', testconfig, 'development'); // save plans

  if (data.live_sk){

    const prodconfig = await setup.stripe(data.live_sk, data.freePlan);  
    await setup.settings('stripe', prodconfig, 'production'); // save plans

  }

  console.log(chalk.green('Stripe settings saved'));
  return res.status(200).send({ message: 'Stripe settings saved' });

};

/*
* setup.url()
* get the main app url
*/

exports.url = async function(req, res){
  
  res.status(200).send({ data: {

    remote_server: frontendSettings.development.remote_server,
    remote_client: frontendSettings.development.remote_client
    
  }});
}

/*
* setup.url.update()
* update the main app url
*/

exports.url.update = async function(req, res){

  // save server url in client 
  await setup.client({ remote_server: req.body.remote_server }, 'development');
  await setup.client({ remote_server: req.body.remote_server}, 'production');
  await setup.client({ remote_client: req.body.remote_client }, 'development');
  await setup.client({ remote_client: req.body.remote_client }, 'production');
  res.status(200).send({ message: 'URL saved' });
  
}

/*
* setup.account()
* create the master account
*/

exports.account = async function(req, res){

  // check if account exists
  const data = req.body;
  utility.validate(data, ['email', 'password']);

  let userData = await user.get(null, data.email);
  if (userData.length) throw { message: 'You have already registered an account with this email' };

  // create the account and user
  const accountData = await account.create({ plan: 'master', name: 'Master' });

  userData = await user.create({ name: 'Master', email: data.email, password: data.password }, accountData.id);
  await user.account.add(userData.id, accountData.id, 'master');

  console.log(chalk.green('Master account created'));
  return res.status(200).send({ message: 'Master account created' });

};

/*
* setup.token()
* save the token secret
*/

exports.token = async function(req, res){

  utility.validate(req.body, ['token_secret']);
  await setup.env('TOKEN_SECRET', req.body.token_secret);
  return res.status(200).send({ message: 'Token secret saved' }); 

}