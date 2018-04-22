const axios = require('axios');
const moment = require('moment');
const util = require('util');
const fs = require('fs');
const appendFile = util.promisify(fs.appendFile);

const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');


// GET
exports.forecast = (req, res) => {
    res.render('search', {title: 'Find Your Weather Forecast'});
};


// POST
exports.search = async (req, res) => {

    try {
        const address = req.body.address;
        const encodedAddress = encodeURIComponent(address);
    
        const coordinates = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBzEHOCWEy8yFaAG7To5pOzKjPlzF3jED4`);
        const lat = coordinates.data.results[0].geometry.location.lat;
        const lng = coordinates.data.results[0].geometry.location.lng;
        
        const weather = await axios.get(`https://api.darksky.net/forecast/bf1d6ec43534b7fff4b82f68849720f3/${lat},${lng}`);
    
           const current = {
            city: req.body.address.split(', ').slice(0, 1),
            summary: weather.data.currently.summary,
            temp: weather.data.currently.temperature,
            wind: weather.data.currently.windSpeed,
            humidity: weather.data.currently.humidity,
            clouds: weather.data.currently.cloudCover
           }
    
            const daily = weather.data.daily.data.map(data => {
            return {
                date: moment(data.time * 1000).format('MMM Do YYYY'),
                summary: data.summary,
                temp: data.temperatureHigh,
                tempLow: data.temperatureLow,
                wind: data.windSpeed
                }
            });
      
         // Get 4 days forecast data
        const [today, tomorrow, three, four, five] = daily;
        res.render('search', {title: 'Find Your Weather Forecast', current, tomorrow, three, four, five });
    } catch (e) {
        res.render('error', {title: 'Something Went Wrong', message: e, status: e.response.status });
    }

};


exports.receive = (req, res) => {
    res.render('test');
}




exports.receivePost = (req, res) => {

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
    
      const mailOptions = {
            from: `YANDEX FUC....`,
            to: '2011mckinsey@example.com',
            subject: 'Website contact form',
            text: 'This will be filled later',
            html: `TEXT: ${JSON.stringify(req.body)}`
    
        };
    

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("success")
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    //   const sendMail = promisify(transport.sendMail, transport);
    
    //   sendMail(mailOptions).then((info) => {
    //       console.log(info)
        res.status(200).send();
    //   }).catch((err) => {
    //     res.render('error', {message:'Something went wrong'});
    //   })
      
}
