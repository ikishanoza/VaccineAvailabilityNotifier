# VaccineNotifier 
This Application checks the cowin portal periodically to find vaccination slots available in your pin code and for your age. If found, it will automatically send you emails every minute until the slots are available.


# Steps 

1) Enable application access on your gmail with steps given here
    https://support.google.com/accounts/answer/185833?hl=en&authuser=0&pli=1 

2) Enter the details in the file .env, which is available in root folder

3) In your terminal(In Local or ec2) run following command 

    npm i && pm2 start vaccineNotifier.js

4) To Kill or Close the application  following command  
    pm2 stop vaccineNotifier.js && pm2 delete vaccineNotifier.js

