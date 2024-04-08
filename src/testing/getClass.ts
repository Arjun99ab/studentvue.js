import axios from "axios";
require("dotenv").config();

import { Client, loginVUE } from "./StudentVue";

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DISTRICTURL = "https://md-mcps-psv.edupoint.com/";

let client:Client;

const login = async () => {
    await loginVUE(USERNAME, PASSWORD, DISTRICTURL).then((c: Client) => {
        client = c;
    })
};

const main = async () => {
    await login();
    await client.getClasses();
    client.getAssignments(6).then((data) => {
        console.log(JSON.stringify(data));
    })
}

main();

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
