require('dotenv').config()
const moment = require('moment');
const notifier = require('./mailer');
const axios = require('axios');
const cron = require('node-cron');


const BASE_URL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin';
const PINCODE = process.env.PINCODE
const EMAIL = process.env.EMAIL
const AGE = process.env.AGE
const NO_OF_DAYS_TO_CHECK = Number(process.env.NO_OF_DAYS_TO_CHECK) || 10
const PREFERRED_VACCINE_LIST = process.env.PREFERRED_VACCINE.split(',')
async function mailFunction(){
    try {
        cron.schedule('*/5 * * * *', async () => {
            await checkVaccineAvailability();
       });
    } catch (e) {
        console.log('Error Occured: ' + JSON.stringify(e, null, 2));
        throw e;
    }
}

async function checkVaccineAvailability() {

    let datesArray = await fetchNextDays();
    datesArray.forEach(date => {
        getAvailableSlotsForDay(date);
    })
}

function getAvailableSlotsForDay(DATE) {
    let config = {
        method: 'get',
        url: `${BASE_URL}?pincode=${PINCODE}&date=${DATE}`,
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'hi_IN'
        }
    };

    axios(config)
        .then(function (slots) {
            let activeSession = slots.data.sessions;
            let validSlots = activeSession.filter(slot => slot.min_age_limit <= AGE &&  slot.available_capacity > 0 && (PREFERRED_VACCINE_LIST.length >0 || PREFERRED_VACCINE_LIST.indexOf(slot.vaccine)))
            if(validSlots.length > 0) {
                notifyByEmail(validSlots);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function

notifyByEmail(validSlots){
    let slotDetails = JSON.stringify(validSlots, null, '\t');
    notifier.sendEmail(EMAIL, 'VACCINE AVAILABLE', slotDetails, (err, result) => {
        if(err) {
            console.error({err});
        }
    })
};

async function fetchNextDays(){
    let dates = [];
    let today = moment();
    for(let i = 0 ; i < NO_OF_DAYS_TO_CHECK ; i ++ ){
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(1, 'day');
    }
    return dates;
}


mailFunction()
    .then(() => {console.log('Vaccine availability checker started.');});
