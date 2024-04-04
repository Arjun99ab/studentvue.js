import StudentVue from '..';
import axios from 'axios';
// import credentials from './credentials.json';
require('dotenv').config();

console.log(process.env.USERNAME);

const api = axios.create({
    baseURL: 'https://md-mcps-psv.edupoint.com/',
    headers: {
        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"macOS"', 
        'Upgrade-Insecure-Requests': '1', 
        'Connection': 'keep-alive', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 
        'Sec-Fetch-Site': 'same-origin', 
        'Sec-Fetch-User': '?1', 
        'host': 'md-mcps-psv.edupoint.com', 
    },
    withCredentials: true,
    responseType: 'json'
});

let loginData = {
    '__EVENTVALIDATION': 'UGw6YPMBC2Ub2woFOSKtuDnEaAJXmBfHSaK42KRG0jHLNFyqVzjvBvvyPphj3Lm3YKf3dz4v5Pc5aOYqM+XUbYjXXKufvDIe3aH47s0hr/VKGOqW29PVii2CuaWytgEvKA5+0/xgxixdX9Gw/ju6izPhdZdhZOvvsNfmFwmdyCk=',
    '__VIEWSTATE': 'wZJYAJ4apaSNIy6vpSc3lfdnAq7DiIZL1BrsRWJxfl4ag36f36MPkJPTqugGwo4e6abcMx4C3JxfFx5AcpumXYAP+KQb/By/GPc54wXQSM4=',
    '__VIEWSTATEGENERATOR': 'E13CECB1',
    'ctl00$MainContent$Submit1': 'Login',
    'ctl00$MainContent$password': process.env.PASSWORD,
    'ctl00$MainContent$username': process.env.USERNAME
};

let loginConfig = {
    headers: { 
        
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-User': '?1', 
        'Sec-Fetch-Dest': 'document', 
        'host': 'md-mcps-psv.edupoint.com', 
    },
};

let gradebookData = '{"request":{"gradingPeriodGU":"1022E1B6-C707-495E-89AB-BF4811ED3EF1","AGU":"0","orgYearGU":"2770147F-2A1B-44E3-87E8-90EE58CD89E7","schoolID":199,"markPeriodGU":"90D5191E-ABB2-4F94-A1A3-159A82A79B82"}}';

let gradebookConfig = {
    headers: { 
        
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-User': '?1', 
        'Sec-Fetch-Dest': 'document', 
        'host': 'md-mcps-psv.edupoint.com', 
    },
};

const loginSession = async() => {
    const response = api.post("PXP2_Login_Student.aspx?regenerateSessionId=True", loginData, loginConfig)
    return (await response).headers['set-cookie'];
}

const sessionId = loginSession()
.then((data) => {
    console.log(data)
}
)