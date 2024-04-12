# reversed urls

## login
**URL:** https://md-mcps-psv.edupoint.com/PXP2_Login_Student.aspx?regenerateSessionId=True \
**Type:** POST\
**Body:** form urlencoded
```
{
    '__EVENTVALIDATION': '',
    '__VIEWSTATE': '',
    '__VIEWSTATEGENERATOR': 'E13CECB1',
    'ctl00$MainContent$Submit1': 'Login',
    'ctl00$MainContent$password': this.password,
    'ctl00$MainContent$username': this.username
}
```
**Todo:** get eventvalidation and viewstate per user

## parameters
**URL:** https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0\
**Type:** GET\
**Body:** None


## classes
**URL:** https://md-mcps-psv.edupoint.com/service/PXP2Communication.asmx/GradebookFocusClassInfo\
**Type:** POST\
**Body:** raw (info from `parameters` req)
```
{
    "request": {
        "gradingPeriodGU": "",
        "AGU": "0",
        "orgYearGU": "",
        "schoolID": 0,
        "markPeriodGU": ""
  }
}
```

## classes
**URL:** https://md-mcps-psv.edupoint.com/service/PXP2Communication.asmx/GradebookFocusClassInfo\
**Type:** POST\
**Body:** raw (info from `parameters` req)
```
{
    "request": {
        "gradingPeriodGU": "",
        "AGU": "0",
        "orgYearGU": "",
        "schoolID": 0,
        "markPeriodGU": ""
  }
}
```

