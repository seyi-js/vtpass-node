const Helper = require('../utils/helpers')
/**
 * @class Service
 */
module.exports = class Service {

    /**
     * @param {Object} request
     */
    constructor(request) {
        this.axios = request;
        this.Helper = new Helper()
    };





    /**
     * 
     * @param {String} network 
     * @param {String} amount 
     * @param {String} recipient_phone
     *  @param {String} request_id  optional
     * @returns {JSON} A JSON response
     */
    async purchaseAirtime(network, amount, recipient_phone, request_id = '') {
        try {


            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;
            const body = {
                serviceID: network,
                amount,
                phone: recipient_phone,
                request_id

            };

            const response = await this.axios.post(`/pay`, body)

            return response.data;
        } catch (error) {
            this.Helper.handleError(error)
        }

    };


    /**
     * 
     * @param {String} provider One of mtn,glo,smile,9mobile,airtel 
     * @param {String} variation_code You can get this by calling the misc.getDataVariationCodes method.
     * @param {String} recipient_phone
     *  @param {String} request_id  Optional
     * @returns {JSON} A JSON response
     */
    async purchaseData(provider, variation_code, recipient_phone, request_id = '', ) {
        try {
            let serviceID;
            const billersCode = recipient_phone;
            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;
            provider == 'smile' ? serviceID = provider + '-direct' : serviceID = provider + '-data';

            const response = await this.axios.post('/pay', {
                request_id,
                serviceID,
                variation_code,
                phone: recipient_phone,
                billersCode
            });

            return response.data;
        } catch (error) {
            this.Helper.handleError(error)
        };
    };


    /**
     * 
     * @param {String} provider e.g dstv, startimes, gotv, showmax
     * @param {String} variation_code 
     * @param {String} smart_card_number 
     * @param {String} phone_number The phone number of the customer or recipient of this service(showmax)
     * @param {String} request_id optional
     * @param {String} subcription_type  to change BOUQUET 'change' or  to renew BOUQUET 'renew', defaults to 'renew' if not provided.
     * @param {String} month The number of months viewing month. Defaults to 1 
     */

    async purchaseCableTV(provider, variation_code, smart_card_number, phone_number = '', subcription_type = 'renew', month = '1', request_id = '', ) {
        try {

            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;

            const response = await this.axios.post('/pay', {
                request_id,
                serviceID: provider,
                billersCode: provider != 'showmax' ? smart_card_number : phone_number,
                variation_code,
                phone: phone_number,
                quantity: month,
                subcription_type
            });


            return response.data;


        } catch (error) {
            this.Helper.handleError(error)
        };
    };

    /**
     * 
     * @param {string} meter_number 
     * @param {string} provider 
     * @param {number} amount 
     * @param {string} phone_number 
     * @param {string} type 
     * @param {string} request_id 
     * @returns {JSON}
     */
    async purchaseElectricity(meter_number, provider, amount, phone_number, type = "prepaid", request_id = '') {
        try {
            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;

            const response = await this.axios.post(
                `/pay`, {
                    request_id,
                    serviceID: provider,
                    billersCode: meter_number,
                    variation_code: type,
                    phone: phone_number,
                    amount
                });

            return response.data;
        } catch (error) {
            this.Helper.handleError(error);
        }
    };


    /**
     * 
     * @param {string} serviceID 
     * @param {string} variation_code 
     * @param {string} phone_number 
     * @param {string} request_id 
     * @returns {JSON}
     */
    async purchaseEducation(serviceID, variation_code, phone_number, request_id = '') {
        try {
            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;

            const response = await this.axios.post(
                `/pay`, {
                    request_id,
                    serviceID,
                    variation_code,
                    phone: phone_number,
                });

            return response.data;
        } catch (error) {
            this.Helper.handleError(error);
        }
    };

    /**
     * 
     * @param {*} serviceID 
     * @param {*} plate_number 
     * @param {*} variation_code 
     * @param {*} phone_number 
     * @param {*} Insured_Name 
     * @param {*} Engine_Number 
     * @param {*} Chasis_Number 
     * @param {*} Plate_Number 
     * @param {*} Vehicle_Make 
     * @param {*} Vehicle_Color 
     * @param {*} Vehicle_Model 
     * @param {*} Year_of_Make 
     * @param {*} Contact_Address 
     * @param {*} request_id 
     * @returns 
     */
    async purchaseThirdPartyVehicleIsurance(serviceID,plate_number,variation_code,phone_number,Insured_Name,Engine_Number,Chasis_Number,Plate_Number,Vehicle_Make,Vehicle_Color,Vehicle_Model,Year_of_Make,Contact_Address,request_id=''){
        try {
            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;

            const response = await this.axios.post(
                `/pay`, {
                    request_id,
                    serviceID,
                    billersCode:plate_number,
                    variation_code,
                    Insured_Name,
                    Engine_Number,
                    Chasis_Number,
                    Plate_Number,
                    Vehicle_Color,
                    Vehicle_Make,
                    Vehicle_Model,
                    Year_of_Make,
                    Contact_Address,
                    phone: phone_number,
                });

            return response.data;
            
        } catch (error) {
            this.Helper.handleError(error);
        }
    };

    /**
     * 
     * @param {string} account_number 
     * @param {string} variation_code 
     * @param {string} amount 
     * @param {string} phone_number 
     * @param {string} serviceID 
     * @param {string} request_id 
     */
    async bankDeposit(account_number,variation_code,amount,phone_number,serviceID = 'bank-deposit',request_id=''){
        try {
            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;
            const response = await this.axios.post(`/pay`, {billersCode: account_number, variation_code, amount, phone:phone_number, request_id, serviceID},{headers: {'Authorization' : this.auth} });
        } catch (error) {
            this.Helper.handleError(error);   
        }
    };

};