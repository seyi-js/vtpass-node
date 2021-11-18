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

    async purchaseCableTV(provider, variation_code, smart_card_number, phone_number = '',  subcription_type = 'renew', month='1',request_id = '',) {
        try {

            request_id == '' ? request_id = this.Helper.generateUniqueId() : null;

            const response = await this.axios.post('/pay', {
                request_id,
                serviceID: provider,
                billersCode: provider != 'showmax' ? smart_card_number : phone_number,
                variation_code,phone:phone_number,quantity:month,subcription_type
            });


            return response.data;


        } catch (error) {
            this.Helper.handleError(error)
        }
    }

}