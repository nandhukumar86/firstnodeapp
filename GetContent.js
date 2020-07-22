const axios = require('axios');

const integrationApiClient = axios.create({
    baseURL: 'https://apihub.document360.net/v1',
    headers: { 'Content-Type': 'application/json', 'api_token': '/KPDRCQ8AAGm3dOkXdO5h8Z6CNeHCV2WObdv35iS0K/UzAcsHkG22QyEVI4CZs2Y4OCZkA5HXV2SS626hUFu326SmkYCuQ2WmbdOG9xYMZSN+Kp4/NKSlejoy1hbVsfu++CN9u3+gC7RyeL8wPvNzg==' }
});


integrationApiClient.get('/ProjectVersions')
    .then(res => {
        return Promise.all(res.data.data.map(v => integrationApiClient.get(`/ProjectVersions/${v.id}/articles`)))
    })
    .then(versions => {
        data = []
        versions.forEach(version => {
            version.data.data.forEach(article => {
                integrationApiClient.get(`/Articles/${article.id}/fr`)
                .then(res=>{ 
                    console.log('----------------Article------------------')
                    console.log(`Title: ${res.data.data.title}`);
                    console.log(`Content: ${res.data.data.content}`);
                    console.log(`HTML : ${res.data.data.html_content}`);
                    })
                .catch(err=>{
                    console.log(err);
                })
                
            })
        });
    })