import {loginVUE} from './StudentVue';

require('dotenv').config();

const login = async() => {
    await loginVUE(process.env.USERNAME, process.env.PASSWORD, 'https://md-mcps-psv.edupoint.com/').then((client) => {
        console.log(client.cookieJar.toJSON().cookies[0].value);
        client.getClasses().then((classes) => {
            console.log(JSON.stringify(classes));
        });
    })
};
login();