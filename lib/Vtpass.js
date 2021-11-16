const axios = require('axios').default;
const Service = require('./services')


/**
 * @class VTpass
 */

module.exports = class VTpass {

    /**
     * 
     * @param {*} env - environment e.g production or development. Defaults to development if not provided.
     * @param {*} username - your username for either production or development
     * @param {*} password - your password for either production or development
     * @returns { VtPass }  - An instance of VtPass
     */
    constructor({ env = 'development', username, password }) {
        const authentication = `Basic ${new Buffer.from(username + ":" + password).toString("base64")}`;

        this.request = axios.create({
            baseURL: env == 'production' ? 'https://vtpass.com/api' : 'https://sandbox.vtpass.com/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authentication
            }
        });

        this.service = new Service(this.request);


    }

    

};


