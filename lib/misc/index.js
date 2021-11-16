const Helper = require('../utils/helpers')

/**
 * @description returns methods not related to services such as verification of meter number e.t.c
 * @class Misc
 */
module.exports = class Misc {

    /**
     * @param {Object} request
     */
    constructor(request) {
        this.axios = request
    };


    /**
     * 
     * @param {String} provider one of mtn,glo,smile,9mobile,airtel
     * @returns {JSON} A JSON object conataining the data variations
     */
    async getDataVariationCodes(provider) {
        try {

            let serviceID;
            provider == 'smile' ? serviceID = provider + '-direct' : serviceID = provider + '-data';

            const response = await this.axios.get(`/service-variations?serviceID=${serviceID}`);


            return response.data;

        } catch (error) {
            new Helper().handleError(error);
        }


    }



}