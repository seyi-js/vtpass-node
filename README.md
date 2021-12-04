# VTpass node

## Installation

```bash
npm i vtpass-node
```


## Usage

```js
const VTpass = require('vtpass-node')


const vtpass = new VTpass()//For development

const vtpass = new VTpass('production','username','password')//Production

( async () => {
    
    //Airtime Purchase
    const network ='';
    const amount='';
    const recipient_phone = '08011111111';//For development
    const request_id ='';//One is generated if not provided
        
    
    const response = await vtpass.service.purchaseAirtime(network,amount,recipient_phone,request_id);

    console.log(response)

})()
```


### Available services

* service.purchaseAirtime `Airtime purchase`

* service.purchaseData `Data subscription`

* service.purchaseEducation `Educational Payment`

* service.purchaseCableTV `CableTV subscription`

* service.purchaseElectricity `Electricity payment`

* service.purchaseThirdPartyVehicleIsurance `Third-party isurance payment`

* service.bankDeposit `Make bank transfer`


### Available Miscellaneous

* misc.getDataVariationCodes `Variation codes for data subscriptions`

* misc.getCableTVariationCodes `Variation codes for CableTVs`

* misc.getElectricityVariationCodes `Variation codes for Electricity companies`

* misc.getEducationVariationCodes `Variation codes for Education`

* misc.getIsuranceVariationCodes `Variation codes for Isurance payment`

* misc.getBankVariationCodes `Variation codes for bank deposit`

* misc.verifySmilePhoneNumber 

* misc.verifySmileEmail

* misc.verifySmartCardNumber 

* misc.verifyMeterNumber 

* misc.verifyAccountNumber

* misc.queryTransaction `Get details about a transaction`


## Extra 

Refer to the [documentation](https://www.vtpass.com/documentation) for more information.

