# payir-v2

## Description

By using this package you will be able to work with [pay.ir](https://pay.ir) rest api documented at [Here](https://docs.pay.ir/gateway/).

### Note: Fully tested at 1400/04/24

This package fully tested at 2021/jul/14 -- 1400/04/24

This package use ES6 and depends on [axios](https://axios-http.com) v0.21.1

## Installation

just run this command on your terminal in the project directory

`npm install payir-v2`

## Usage

first import payir-v2

`const PayirV2 = require("payir-v2")`

then create an instance of imported class and replace `your api token` with the token you got on pay.ir or you fetures.

`const pay = new PayirV2("your api token")`

Now you can use following methods:

### 1- `send` method

`pay.send(amount,callbackUrl,options)`

returns a promis witch can be rejected if `amount<=10000` or your callback url is not correct or resolved with this object : `{status: 1, token: "createdToken", gatewayUrl : "https://linkToGateway"}`

| Name        | Required | Description                                                                                              |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------- |
| amount      | yes      | amount of payment request in Rial(ریال). it should be a number grater than 10,000                        |
| callbackUrl | yes      | payment gateway will redirect user to this url after payment finished with two params : 1-status 2-token |
| options     | no       | options to send to payment gateawy like: factorNumber, mobile, etc.                                      |

Also you can read more about these on [pay.ir documents](https://docs.pay.ir/gateway/#مرحله-اول-ارسال-دیتا)

### 2- `verify` method

due to docs if status parms of your callback is equal to `"1"` you have to verfiy transaction otherwise the amount of transaction will retuen to customer after 30 minutes.

`pay.verify(status,token)`

retuens a promis witch resolved with verify data or rejected if `status !== "1"`

| name   | requires | description                                                                                                   |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| token  | yes      | token of of your gateway witch retuen in parm in your callbackUrl `https://yourCallback.test?token=yourToken` |
| status | yes      | token of of your gateway result witch retuen in parm in your callbackUrl `https://yourCallback.test?status=1` |

Also you can read more about these on [pay.ir documents](https://docs.pay.ir/gateway/#مرحله-اول-ارسال-دیتا)
