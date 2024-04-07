import axios from 'axios';
// @ts-ignore
import { wrapper } from 'axios-cookiejar-support';
// @ts-ignore
import { CookieJar } from 'tough-cookie';

const login = async (username: string, password: string, hostURL: string) => {
    let client = new Client(username, password, hostURL);
    await client.createSession();
    return client;
}

class Client {
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
    public async createSession(): Promise<void> {
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
        await this.client.post("PXP2_Login_Student.aspx?regenerateSessionId=True", loginData, loginConfig).then(({ config }) => {
                if (config.jar) {
                    this.cookieJar = config.jar;
                }
            }).catch((err) => {
                console.log(err);
        })
    }
    public getClasses(gradingPeriodGU: string, AGU: string, orgYearGU: string, schoolID: string, markingPeriodGU: string): Promise<JSON>  {
        let gradebookData = `{"request":{"gradingPeriodGU":"${gradingPeriodGU}}","AGU":"0","orgYearGU":"${orgYearGU}","schoolID":${schoolID}},"markPeriodGU":"${markingPeriodGU}"}}`;
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
        console.log(this.cookieJar)
        return new Promise((resolve, reject) => {
            this.client.post("service/PXP2Communication.asmx/GradebookFocusClassInfo", gradebookData, gradebookConfig).then(({ data }) => {
                // console.log(JSON.stringify(data))
                resolve(data);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }

    public getClass(classID: string, gradingPeriodGU: string, orgYearGU: string): Promise<JSON> {
        let loadControlData = `{"request":{"control":"Gradebook_RichContentClassDetails","parameters":{"classID":${classID},"gradePeriodGU":"${gradingPeriodGU}","OrgYearGU":"${orgYearGU}"}}}`;
        let loadControlConfig = {
            jar: this.cookieJar,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
                'Accept': 'application/json, text/javascript, */*; q=0.01', 
                'Sec-Fetch-Mode': 'cors', 
                'Sec-Fetch-User': '?1', 
                'Sec-Fetch-Dest': 'empty', 
                'Sec-Fetch-Site': 'same-origin', 
                'host': 'md-mcps-psv.edupoint.com', 
                'Origin': 'https://md-mcps-psv.edupoint.com', 
                'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0',
            }
        }

        let classData = '{"FriendlyName":"genericdata.classdata","Method":"GetClassData","Parameters":"{}"}';
        let classConfig = {
            jar: this.cookieJar,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
                'Accept': 'application/json, text/javascript, */*; q=0.01', 
                'Accept-Language': 'en-US,en;q=0.9',
                'host': 'md-mcps-psv.edupoint.com', 
                'Origin': 'https://md-mcps-psv.edupoint.com', 
                'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0',
                'Sec-Fetch-User': '?1', 
                'Sec-Fetch-Dest': 'empty', 
                'Sec-Fetch-Mode': 'cors', 
                'Sec-Fetch-Site': 'same-origin', 
            }
        }
        return new Promise((resolve, reject) => {
            this.client.post('https://md-mcps-psv.edupoint.com/service/PXP2Communication.asmx/LoadControl', loadControlData, loadControlConfig).then(() => {
                this.client.post('https://md-mcps-psv.edupoint.com/api/GB/ClientSideData/Transfer?action=genericdata.classdata-GetClassData', classData, classConfig).then(({ data }) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            })
        })
    }

    public getAssignments(classID: string, gradingPeriodGU: string, orgYearGU: string): Promise<JSON> {
        let loadControlData = `{"request":{"control":"Gradebook_RichContentClassDetails","parameters":{"classID":${classID},"gradePeriodGU":"${gradingPeriodGU}","OrgYearGU":"${orgYearGU}"}}}`
        let loadControlConfig = {
            jar: this.cookieJar,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
                'Accept': 'application/json, text/javascript, */*; q=0.01', 
                'Sec-Fetch-Mode': 'cors', 
                'Sec-Fetch-User': '?1', 
                'Sec-Fetch-Dest': 'empty', 
                'Sec-Fetch-Site': 'same-origin', 
                'host': 'md-mcps-psv.edupoint.com', 
                'Origin': 'https://md-mcps-psv.edupoint.com', 
                'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0',
            }
        }

        let classData = '{"FriendlyName":"pxp.course.content.items","Method":"LoadWithOptions","Parameters":"{\\"loadOptions\\":{\\"sort\\":[{\\"selector\\":\\"due_date\\",\\"desc\\":false}],\\"filter\\":[[\\"isDone\\",\\"=\\",false]],\\"group\\":[{\\"Selector\\":\\"Week\\",\\"desc\\":false}],\\"requireTotalCount\\":true,\\"userData\\":{}},\\"clientState\\":{}}"}';
        let classConfig = {
            jar: this.cookieJar,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8', 
                'Accept': 'application/json, text/javascript, */*; q=0.01', 
                'Accept-Language': 'en-US,en;q=0.9',
                'host': 'md-mcps-psv.edupoint.com', 
                'Origin': 'https://md-mcps-psv.edupoint.com', 
                'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0',
                'Sec-Fetch-User': '?1', 
                'Sec-Fetch-Dest': 'empty', 
                'Sec-Fetch-Mode': 'cors', 
                'Sec-Fetch-Site': 'same-origin', 
            }
        }
        return new Promise((resolve, reject) => {
            this.client.post('service/PXP2Communication.asmx/LoadControl', loadControlData, loadControlConfig).then(() => {
                this.client.post('api/GB/ClientSideData/Transfer?action=genericdata.classdata-GetClassData', classData, classConfig).then(({ data }) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            })
        })
    }
}

export { Client, login }