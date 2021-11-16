const Helper = require('../../utils/helpers/index')
/**
 * @class Airtime
 */
module.exports = class Airtime {

    /**
     * @param {Object} request
     */
    constructor(request) {
        this.axios = request
    };

    /**
     * 
     * @param {String} request_id  optional
     * @param {String} network 
     * @param {String} amount 
     * @param {String} recipient_phone
     * @returns {JSON} A JSON response
     */
    async purchaseAirtime({request_id = '', network, amount, recipient_phone}) {
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

}