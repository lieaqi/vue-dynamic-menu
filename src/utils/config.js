const configs = {
    development: {
        url: "http://cloud-crm-api.0577site.com/core/api"
    },
    production: {
        url: 'http://cloud-crm-api.0577site.com/core/api'
    }
}
export default configs[process.env.NODE_ENV]