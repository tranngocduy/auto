var express = require("express");
var cron = require('node-cron');
var Nightmare = require('nightmare');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var app = express();
const nightmare = Nightmare({ show: false });

var i = 0;
const version = 0.4;
//var listOrder = [];
// auto
function autoBuy() {
    nightmare
        .goto('https://darkness.sku.vn/products/bo-chan-goi-van-phong-olivin-totoro')
        .wait('#buy-now')
        .click('#buy-now')
        .wait(3000)
        .wait('#checkout')
        .click('#checkout')

        .wait('#billing_address_full_name')
        .type('#billing_address_full_name', 'auto buy')

        .wait('#checkout_user_email')
        .type('#checkout_user_email', 'autobuy@haravan.com')


        .wait('#billing_address_phone')
        .type('#billing_address_phone', '0987654321')

        .wait('#billing_address_address1')
        .type('#billing_address_address1', 'ahihi ahihi ahihi')

        .select('#customer_shipping_province', 50)
        // .wait(3000)
        .wait('#customer_shipping_district')
        .select('#customer_shipping_district', 479)
        .wait(1000)
        .click('button.step-footer-continue-btn')

        .wait(10000)

        // .evaluate(function () {
        //     return { firstHeading: document.querySelector('.os-order-number').innerText };
        // }, function (value) {
        //     return { firstHeading: 'Not in page context' };
        // })
        // .run(function (err, nightmare) {
        //     if (err) return console.log(err);
        //     listOrder.push({ order: nightmare.firstHeading.substring(nightmare.firstHeading.indexOf('#')), time: new Date().toLocaleString() });
        // })
        //.end()
        .then(() => {
            console.log('ok order')
        }

        )
        .catch((error) => {
            console.error('Search failed:', error);
        });
}
//

setInterval(function() {
    console.log('===============================');
    console.log('running a task every 1 minute');
    autoBuy();
    i++;
    console.log('Số lần đặt hàng: ' + i);
    console.log('===============================');
}, 60000)


// cron.schedule('0 * * * * *', async(function () {
    
// }));


app.get("/", function (req, res) {
    // var text = listOrder.map(function (e, i) {
    //     if (e) {
    //         var data = null;
    //         if (i === (listOrder.length - 1)) {
    //             data = i + 1 + ' --- ' + e.number.substring(e.number.indexOf('#')) + ' --- ' + e.time;
    //         } else {
    //             data = i + 1 + ' --- ' + e.number.substring(e.number.indexOf('#')) + ' --- ' + e.time + 'zz';
    //         }
    //         return data;
    //     } else {
    //         return 'NO DATA';
    //     }
    // });
    // console.log('text', text);
    // var newListOrder = [];
    // var lastIndex = listOrder.length - 1;
    // for (var i = 0; i < listOrder.length; i++) {
    //     var index = i + 1;
    //     if (i === lastIndex) {
    //         newListOrder.push('--- ' + index + ' --- ' + listOrder[i].order + ' --- ' + listOrder[i].time)
    //     } else {
    //         newListOrder.push('--- ' + index + ' --- ' + listOrder[i].order + ' --- ' + listOrder[i].time + 'zz')
    //     }

    // }
    // console.log('listOrder', listOrder);
    //res.send('Version: '+ version +' \nCount: ' + newListOrder.length + '\n' + newListOrder.toString().replace(/zz,/g, "\n"));
    res.send('Running on version: ' + version + ' Count: ' + i);
})

var port = Number(process.env.PORT || 3000);

app.listen(port, () => console.log('App running port 3000!'));