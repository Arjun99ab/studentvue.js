import StudentVue from '..';
import axios from 'axios';
import dotenv from 'dotenv';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

dotenv.config();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const clientSettings = {
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
};

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));