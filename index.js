const fetch = require('node-fetch')

// Fill in with actual values from chrome developer tools
const xcsrftoken = ''
const cookie = ''
const prescriptionId = ''

const requests = [
  `{\"dayRange\":{\"from\":\"2021-05-06\",\"to\":\"2021-05-07\"},\"geoId\":\"1261011\",\"hourRange\":{\"from\":\"16:00\",\"to\":\"20:00\"},\"prescriptionId\":\"${prescriptionId}\",\"voiId\":\"12\",\"vaccineTypes\":[\"cov19.pfizer\",\"cov19.moderna\"]}`,
  `{\"dayRange\":{\"from\":\"2021-05-08\",\"to\":\"2021-05-09\"},\"geoId\":\"1261011\",\"prescriptionId\":\"${prescriptionId}\",\"voiId\":\"12\",\"vaccineTypes\":[\"cov19.pfizer\",\"cov19.moderna\"]}`,
]

const jazda = (i = 0) =>
  fetch("https://pacjent.erejestracja.ezdrowie.gov.pl/api/calendarSlots/find", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": xcsrftoken,
      "cookie": cookie
    },
    "referrer": "https://pacjent.erejestracja.ezdrowie.gov.pl/rezerwacja-wizyty",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": requests[i],
    "method": "POST",
    "mode": "cors"
  })
    .then(res => res.json())
    .then(body => {
      console.log(body)

      if (body.list && body.list.length) {
        const { id } = body.list[0]

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
            "x-csrf-token": xcsrftoken,
            "cookie": cookie
          },
          "referrer": "https://pacjent.erejestracja.ezdrowie.gov.pl/rezerwacja-wizyty",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `{\"prescriptionId\":\"${prescriptionId}\"}`,
          "method": "POST",
          "mode": "cors"
        })
          .then(res => res.json())
          .then(body => {
            console.log(body)
            process.exit()
          })
      }
    })

const check = (i = 0) => {
  jazda(i).then(
    setTimeout(() => {
      check((i + 1) % requests.length)
    }, 2000)
  )
}

check()
