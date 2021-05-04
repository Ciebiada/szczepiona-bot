const fetch = require('node-fetch')

// FILL_IN the details with the actual tokens taken from from developer tools

const jazda = () => {
  return fetch("https://pacjent.erejestracja.ezdrowie.gov.pl/api/calendarSlots/find", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": "FILL_IN",
      "cookie": "FILL_IN"
    },
    "referrer": "https://pacjent.erejestracja.ezdrowie.gov.pl/rezerwacja-wizyty",
    "referrerPolicy": "strict-origin-when-cross-origin",
    // "body": "{\"dayRange\":{\"from\":\"2021-05-04\",\"to\":\"2021-06-30\"},\"geoId\":\"1261011\",\"prescriptionId\":\"FILL_IN\",\"voiId\":\"12\"}",
    "body": "{\"dayRange\":{\"from\":\"2021-05-04\",\"to\":\"2021-05-05\"},\"geoId\":\"1261011\",\"prescriptionId\":\"FILL_IN\",\"voiId\":\"12\",\"vaccineTypes\":[\"cov19.pfizer\",\"cov19.moderna\"]}",
    "method": "POST",
    "mode": "cors"
  })
    .then(res => res.json())
    .then(body => {
      if (body.list.length) {
        const { id } = body.list[0]

        console.log(body.list[0])

        return fetch(`https://pacjent.erejestracja.ezdrowie.gov.pl/api/calendarSlot/${id}/confirm`, {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrf-token": "FILL_IN",
            "cookie": "FILL_IN"
          },
          "referrer": "https://pacjent.erejestracja.ezdrowie.gov.pl/rezerwacja-wizyty",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"prescriptionId\":\"FILL_IN\"}",
          "method": "POST",
          "mode": "cors"
        }).then(res => res.json()).then(body => {
          console.log(body)
          process.exit()
        })
      }
    })
}

const check = () => {
  console.log('checking...')

  jazda().then(
    setTimeout(() => {
      check()
    }, 1000)
  )
}

check()
