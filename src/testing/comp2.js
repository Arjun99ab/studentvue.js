const axios = require('axios');
let data = '{"FriendlyName":"genericdata.classdata","Method":"GetClassData","Parameters":"{}"}';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://md-mcps-psv.edupoint.com/api/GB/ClientSideData/Transfer?action=genericdata.classdata-GetClassData',
  headers: { 
    'Accept': 'application/json, text/javascript, */*; q=0.01', 
    'Accept-Language': 'en-US,en;q=0.9', 
    'CURRENT_WEB_PORTAL': 'StudentVUE', 
    'Connection': 'keep-alive', 
    'Content-Type': 'application/json; charset=UTF-8', 
    'Cookie': 'PVUE=ENG; EES_PVUE=1863772000.1.3289898288.474140672; ASP.NET_SessionId=3qrgdjc0gk1lgkuwquuhmhly; EES_PVUE=1224335053.1.3289895040.501819392', 
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
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
