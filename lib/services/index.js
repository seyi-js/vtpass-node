const Helper = require('../utils/helpers')
/**
 * @class Service
 */
module.exports = class Service {

    /**
     * @param {Object} request
     */
    constructor(request) {
        this.axios = request
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


            request_id == '' ? request_id = new Helper().generateUniqueId() : null;
            const body = {
                serviceID: network,
                amount,
                phone: recipient_phone,
                request_id

            };

            const response = await this.axios.post(`/pay`, body)

            return response.data;
        } catch (error) {
            new Helper().handleError(error)
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
            request_id == '' ? request_id = new Helper().generateUniqueId() : null;
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
            new Helper().handleError(error);
        };
    };

}