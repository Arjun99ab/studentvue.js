import axios from 'axios';
require('dotenv').config();

import { Client, login } from './Client';

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DISTRICTURL = 'https://md-mcps-psv.edupoint.com/'

const client = login(USERNAME, PASSWORD, DISTRICTURL)
console.log(client.cookieJar.toJSON());





// const client = new Client(process.env.USERNAME, process.env.PASSWORD, 'https://md-mcps-psv.edupoint.com/');
// client.createSession().then(() => {
//     console.log('done');
//     // console.log(client.cookieJar.toJSON());

//     // //get classes
//     // console.log("GET CLASSES")
//     // client.getClasses().then((data) => {
//     //     console.log(JSON.stringify(data));
//     // }
//     // ).catch((err) => {
//     //     console.log(err);
//     // });

//     // get class
//     console.log("GET CLASS")
//     client.getAssignments().then((data) => {
//         console.log(JSON.stringify(data));
//     }).catch((err) => {
//         console.log(err)
//     })

// }).catch((err) => {
//     console.log("ERROR")
//     console.log(err);
// });