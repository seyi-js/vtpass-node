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
        this.Helper = new Helper()
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
            this.Helper.handleError(error)
        }
    };


    /**
     * 
     * @param {String} provider serviceID
     * @returns {JSON}
     */
    async getCableTVariationCodes(provider){
        try {

            const serviceID = provider;
            const response = await this.axios.get(`/service-variations?serviceID=${serviceID}`);

            return response.data;
        } catch (error) {
            this.Helper.handleError(error);
        }
    };


    /**
     * 
     * @param {String} provider serviceID
     * @returns {JSON}
     */
    async getElectricityVariationCodes(provider){
        try {

            const serviceID = provider;
            const response = await this.axios.get(`/service-variations?serviceID=${serviceID}`);

            return response.data;
        } catch (error) {
            this.Helper.handleError(error)
        }
    };


    /**
     * 
     * @param {String} serviceID 
     * @returns {JSON}
     */
    async getEducationVariationCodes(serviceID){
        try {

            const response = await this.axios.get(`/service-variations?serviceID=${serviceID}`);

            return response.data;
            
        } catch (error) {
            this.Helper.handleError(error)
        }
    };


    /**
     * 
     * @param {string} serviceID 
     * @returns 
     */
    async getIsuranceVariationCodes(serviceID){
        try {
            const response = await this.axios.get(`/service-variations?serviceID=${serviceID}`);

            return response.data;
        } catch (error) {
            this.Helper.handleError(error)
        };
    };


    /**
     * 
     * @param {String} phone_number 
     * @returns {JSON} A JSON response
     */
    async verifySmilePhoneNumber(phone_number) {
        try {
            const serviceID = 'smile-direct';
            const response = await this.axios.post('/merchant-verify', {
                serviceID,
                billersCode: phone_number
            });

            return response.data;
        } catch (error) {
            this.Helper.handleError(error);
        }

    };

    /**
     * 
     * @param {String} email 
     * @returns {JSON} A JSON response
     */
    async verifySmileEmail(email) {
        try {
            const serviceID = 'smile-direct';
            const response = await this.axios.post('/merchant-verify/smile/email', {
                serviceID,
                billersCode: email
            });

            return response.data;
        } catch (error) {
            this.Helper.handleError(error);
        }

    };


    /**
     * 
     * @param {String} provider 
     * @param {String} smart_card_number 
     * @returns {JSON} Returns the customer name, current bouquet, subscription due date and the renewal amount (which will be used for BOUQUET RENEWAL).
     */
    async verifySmartCardNumber(provider,smart_card_number){
        try {

        const response = await this.axios.post('/merchant-verify',{serviceID:provider,billersCode:smart_card_number});


        return response.data;
            
        } catch (error) {
            this.Helper.handleError(error)
        }
    };




    /**
     * 
     * @param {String} meter_number 
     * @param {String} provider 
     * @param {String} type  'prepaid' or 'postpaid'
     * @returns {JSON}
     */
    async verifyMeterNumber(meter_number,provider,type='prepaid'){

        try {

            const response = await this.axios.post('/merchant-verify',{serviceID:provider,billersCode:meter_number,type});

            return response.data;

        } catch (error) {
            this.Helper.handleError(error);
        };

    };














}