const fetch = require("node-fetch");
const { Headers } = require('node-fetch');

exports.userToken = async (token) => {
    return fetch('http://0.0.0.0:4000/api/user/token-gql', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }).then(async response => {
            const data = await response.json();
            if (response.status >= 400) {
                throw new Error(data && data.errors && data.errors.message);
            }else{
                return data;
            }
        });

}