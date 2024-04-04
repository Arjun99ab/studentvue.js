import axios from 'axios';
// @ts-ignore
import { wrapper } from 'axios-cookiejar-support';
// @ts-ignore
import { CookieJar } from 'tough-cookie';

/**
 * The StudentVUE Client to access the API
 * @constructor
 */
export default class Client {
    private hostUrl: string;
    private username: string;
    private password: string;
    // public sessionId: string = '';
    public cookieJar = new CookieJar();
    public client = wrapper(axios.create({
        jar: this.cookieJar,
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
    }));

    constructor(username: string, password: string,  hostUrl: string) {
        this.hostUrl = hostUrl;
        this.username = username;
        this.password = password;
    }
  
    /**
     * Validate's the user's credentials. It will throw an error if credentials are incorrect
     */
    public createSession(): Promise<void> {
        let loginData = {
            '__EVENTVALIDATION': 'UGw6YPMBC2Ub2woFOSKtuDnEaAJXmBfHSaK42KRG0jHLNFyqVzjvBvvyPphj3Lm3YKf3dz4v5Pc5aOYqM+XUbYjXXKufvDIe3aH47s0hr/VKGOqW29PVii2CuaWytgEvKA5+0/xgxixdX9Gw/ju6izPhdZdhZOvvsNfmFwmdyCk=',
            '__VIEWSTATE': 'wZJYAJ4apaSNIy6vpSc3lfdnAq7DiIZL1BrsRWJxfl4ag36f36MPkJPTqugGwo4e6abcMx4C3JxfFx5AcpumXYAP+KQb/By/GPc54wXQSM4=',
            '__VIEWSTATEGENERATOR': 'E13CECB1',
            'ctl00$MainContent$Submit1': 'Login',
            'ctl00$MainContent$password': this.password,
            'ctl00$MainContent$username': this.username
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
        return new Promise((resolve, reject) => {
            this.client.post("PXP2_Login_Student.aspx?regenerateSessionId=True", loginData, loginConfig).then(({ config }) => {
                if (config.jar) {
                    this.cookieJar = config.jar;
                    resolve();
                } else {
                    reject();
                }
            }).catch((err) => {
                console.log(err);
                reject();
            })
        })
    }

    public getClasses(): Promise<string>  {
        let gradebookData = '{"request":{"gradingPeriodGU":"1022E1B6-C707-495E-89AB-BF4811ED3EF1","AGU":"0","orgYearGU":"2770147F-2A1B-44E3-87E8-90EE58CD89E7","schoolID":199,"markPeriodGU":"90D5191E-ABB2-4F94-A1A3-159A82A79B82"}}';
        let gradebookConfig = {
            jar: this.cookieJar,
            withCredentials: true,
            headers: { 
                'Content-Type': 'application/json; charset=UTF-8', 
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
                'Sec-Fetch-Mode': 'navigate', 
                'Sec-Fetch-User': '?1', 
                'Sec-Fetch-Dest': 'document', 
                'host': 'md-mcps-psv.edupoint.com', 
                'Origin': 'https://md-mcps-psv.edupoint.com', 
                'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0',
            },
        };
        return new Promise((resolve, reject) => {
            this.client.post("service/PXP2Communication.asmx/GradebookFocusClassInfo", gradebookData, gradebookConfig).then(({ data }) => {
                resolve(data);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })

    }
        
}