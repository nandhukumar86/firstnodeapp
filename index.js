
const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://apihub.document360.io/v1',
    headers: {'Content-Type': 'application/json', 'api_token': '51xI6pLagkrhBUM9QQOE6oqexD6Kyh6g1CWx3RNoLZZ1hrIj54XffzYOOASn8qq0ohy1fo3uIqdg2VHNKkiUcjQO6+0OIExwkyGw3B46GNgNcwGsDISsZ9aKFijkh9fQd0YJJI+p/k9AFAcGB3G/kw=='}
  });


let projectVersionId = '';

instance.get('/ProjectVersions')
  .then(function (res) {
      projectVersionId = res.data.data[0].id;

      instance.get(`/ProjectVersions/${projectVersionId}/categories`)
      .then(function (res) {
          console.log(res.data);
        });
    });
