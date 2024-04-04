import StudentVue from '..';
import axios from 'axios';
import dotenv from 'dotenv';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

dotenv.config();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const jar = new CookieJar();
const client = wrapper(axios.create({
    jar: jar,
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
}));

const loginData = {
    'ctl00$MainContent$Submit1': 'Login',
    'ctl00$MainContent$username': USERNAME,
    'ctl00$MainContent$password': PASSWORD,
    '__EVENTVALIDATION': 'UGw6YPMBC2Ub2woFOSKtuDnEaAJXmBfHSaK42KRG0jHLNFyqVzjvBvvyPphj3Lm3YKf3dz4v5Pc5aOYqM+XUbYjXXKufvDIe3aH47s0hr/VKGOqW29PVii2CuaWytgEvKA5+0/xgxixdX9Gw/ju6izPhdZdhZOvvsNfmFwmdyCk=',
    '__VIEWSTATE': 'wZJYAJ4apaSNIy6vpSc3lfdnAq7DiIZL1BrsRWJxfl4ag36f36MPkJPTqugGwo4e6abcMx4C3JxfFx5AcpumXYAP+KQb/By/GPc54wXQSM4='
}

