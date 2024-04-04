import StudentVue from '..';
import axios from 'axios';
// import credentials from './credentials.json';

const loginUrl = "https://md-mcps-psv.edupoint.com/PXP2_Login_Student.aspx?regenerateSessionId=False";
console.log(loginUrl)


let data = {
    '__EVENTVALIDATION': 'UGw6YPMBC2Ub2woFOSKtuDnEaAJXmBfHSaK42KRG0jHLNFyqVzjvBvvyPphj3Lm3YKf3dz4v5Pc5aOYqM+XUbYjXXKufvDIe3aH47s0hr/VKGOqW29PVii2CuaWytgEvKA5+0/xgxixdX9Gw/ju6izPhdZdhZOvvsNfmFwmdyCk=',
    '__VIEWSTATE': 'wZJYAJ4apaSNIy6vpSc3lfdnAq7DiIZL1BrsRWJxfl4ag36f36MPkJPTqugGwo4e6abcMx4C3JxfFx5AcpumXYAP+KQb/By/GPc54wXQSM4=',
    '__VIEWSTATEGENERATOR': 'E13CECB1',
    'ctl00$MainContent$Submit1': 'Login',
    'ctl00$MainContent$password': process.env.PASSWORD,
    'ctl00$MainContent$username': process.env.USERNAME
};

let config = {
    withCredentials: true,
    headers: { 
        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"macOS"', 
        'Upgrade-Insecure-Requests': '1', 
        'Connection': 'keep-alive', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
        'Sec-Fetch-Site': 'same-origin', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-User': '?1', 
        'Sec-Fetch-Dest': 'document', 
        'host': 'md-mcps-psv.edupoint.com', 
    },
};

let data2 = '{"request":{"gradingPeriodGU":"1022E1B6-C707-495E-89AB-BF4811ED3EF1","AGU":"0","orgYearGU":"2770147F-2A1B-44E3-87E8-90EE58CD89E7","schoolID":199,"markPeriodGU":"90D5191E-ABB2-4F94-A1A3-159A82A79B82"}}';


let config2 = {
    withCredentials: true,
    headers: { 
        'Accept': 'application/json, text/javascript, */*; q=0.01', 
        'Accept-Language': 'en-US,en;q=0.9', 
        'Connection': 'keep-alive', 
        'Content-Type': 'application/json; charset=UTF-8', 
        'Cookie': 'ASP.NET_SessionId=fbuno1yqzn3krwhhxmcgsnlo; EES_PVUE=1863772000.1.3289898288.472492032', 
        'Origin': 'https://md-mcps-psv.edupoint.com', 
        'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0', 
        'Sec-Fetch-Dest': 'empty', 
        'Sec-Fetch-Mode': 'cors', 
        'Sec-Fetch-Site': 'same-origin', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 
        'X-Requested-With': 'XMLHttpRequest', 
        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"macOS"'
    },
};
const grade = async () => {
    await axios.post('https://md-mcps-psv.edupoint.com/service/PXP2Communication.asmx/GradebookFocusClassInfo', data2, config2)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
}
// grade();

const loginResponse = async() => {
    await axios.post(loginUrl, data, config)
    .then((res) => {
        let x = (res.headers['set-cookie'] as string[])[0].split(';')[0];
        console.log(x);
        let config2 = {
            headers: { 
                'Accept': 'application/json, text/javascript, */*; q=0.01', 
                'Accept-Language': 'en-US,en;q=0.9', 
                'Connection': 'keep-alive', 
                'Content-Type': 'application/json; charset=UTF-8', 
                'Cookie': x + '; EES_PVUE=1863772000.1.3289898288.472492032', 
                'Origin': 'https://md-mcps-psv.edupoint.com', 
                'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0', 
                'Sec-Fetch-Dest': 'empty', 
                'Sec-Fetch-Mode': 'cors', 
                'Sec-Fetch-Site': 'same-origin', 
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 
                'X-Requested-With': 'XMLHttpRequest', 
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"macOS"'
            },
        };
        const grade = async () => {
            await axios.post('https://md-mcps-psv.edupoint.com/service/PXP2Communication.asmx/GradebookFocusClassInfo', data2, config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        }
        grade();
    })
    .catch((err) => {
        console.log(err);
    });
}
loginResponse();




console.log("hello")
const findDistricts = async () => {
    await StudentVue.findDistricts('85757')
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }
// findDistricts();
const login = async () => {
    await StudentVue.login('https://md-mcps-psv.edupoint.com', {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }
// login();

    