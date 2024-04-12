import axios from "axios";
require("dotenv").config();

import { Client, loginVUE } from "./StudentVue";

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DISTRICTURL = "https://md-mcps-psv.edupoint.com/";

let client:Client;

const login = async () => {
    await loginVUE(USERNAME, PASSWORD, DISTRICTURL, true).then((c: Client) => {
        client = c;
    })
};

const main = async () => {
    await login();
    const gradebook = await client.gradebook();
    await client.getClasses()
    // client.getClass(1).then((res) => {
    //     console.log(JSON.stringify(res));
    // })
    console.log(JSON.stringify(gradebook));
}

main();
