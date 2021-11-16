const axios = require('axios').default;
const Service = require('./services')
const Misc = require('./misc')

/**
 * @class VTpass
 */

module.exports = class VTpass {

    /**
     * 
     * @param {*} env - environment e.g production or development. Defaults to development if not provided.
     * @param {*} username - your username for production
     * @param {*} password - your password for  production
     * @returns { VtPass } - An instance of VTpass
     */
    constructor(env = 'development', username = '', password ='' ) {
        const authentication = env == 'production' ? `Basic ${new Buffer.from(username + ":" + password).toString("base64")}` : 'Basic c2FuZGJveEB2dHBhc3MuY29tOnNhbmRib3g=';

        this.request = axios.create({
            baseURL: env == 'production' ? 'https://vtpass.com/api' : 'https://sandbox.vtpass.com/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authentication
            }
        });

        this.service = new Service(this.request);
        this.misc = new Misc(this.request)


    }

    

};


