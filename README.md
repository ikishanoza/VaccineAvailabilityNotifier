# VaccineNotifier 
This Application checks the cowin portal periodically to find vaccination slots available in your pin code and for your age. If found, it will automatically send you emails every minute until the slots are available.

you can also set NO_OF_DAYS_TO_CHECK params in .env to check for how may days you wanted to check. You can also set PREFERRED_VACCINE with these two value(COVAXIN,COVISHIELD) to choose which one you wanted.

# Steps 

1) Enable application access on your gmail with steps given here
    https://support.google.com/accounts/answer/185833?hl=en&authuser=0&pli=1 

2) Enter the details in the file .env, which is available in root folder. Here is an example 
    PINCODE=360001
    EMAIL=ikishan.oza@gmail.com
    APPLICATION_PASSWORD=askdjklj11aklsj
    AGE=25
    NO_OF_DAYS_TO_CHECK=2
    PREFERRED_VACCINE=COVAXIN,COVISHIELD

3) In your terminal(In Local or ec2) run following command 

    npm i && pm2 start vaccineNotifier.js

4) To Kill or Close the application  following command  
    pm2 stop vaccineNotifier.js && pm2 delete vaccineNotifier.js

# API Source
    https://apisetu.gov.in/public/marketplace/api/cowin/cowin-protected-v2#/Vaccination%20Appointment%20APIs/findByPin
    
References (Official Documentations):
[1] Postman: https://www.postman.com/postman/workspace/covid-19/documentation/4258786-7de7f235-bd0e-4660-a9d2-2e823a4b872d
[2] APISetu: https://apisetu.gov.in/public/api/cowin#/Appointment%20Availability%20APIs/calendarByPin

