import axios from 'axios';
require('dotenv').config();

import Client from './Client';

const client = new Client(process.env.USERNAME, process.env.PASSWORD, 'https://md-mcps-psv.edupoint.com/');
client.createSession().then(() => {
    console.log('done');
    console.log(client.cookieJar.toJSON());
    client.getClasses().then((data) => {
        console.log(data);
    }
    ).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});