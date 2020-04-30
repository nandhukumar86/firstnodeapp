
const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://apihub.document360.info/v1',
    headers: {'Content-Type': 'application/json', 'api_token': '51xI6pLagkrhBUM9QQOE6k7XFnbZYROx8krdClXBxJsnOZUTAjmPzn4oJ4Pushs1nGHgpKxYCN84bCDEtqkg+6O6oUzbfSOx4zyuiOGhnNFy6b6m+sIxxL3dfARR5megBF9mvqs5woW492B5QHe/TA=='}
  });


let projectVersionId = '';

instance.get('/ProjectVersions')
  .then(function (res) {
      projectVersionId = res.data.data[0].id;

      instance.get(`/ProjectVersions/${projectVersionId}/categories`)
      .then(function (res) {
        Recursion('category', res.data.data[1], 'Parent');
        });
    });


function Recursion(nodetype, obj, parent) {

  if(nodetype == 'article')
  {
    console.log(`item:${obj.title} parent:${parent}`);
  }
  
  //Add Push to files accordingly
  if(nodetype == 'category')
  {
    console.log(`item:${obj.name} parent:${parent}`);

    var subCategories = obj.child_categories;
    var articles = obj.articles;

    subCategories.forEach(element => {
      Recursion('category', element, obj.name);
    });
    
    articles.forEach(element => {
      Recursion('article', element, obj.name);
    });
  }
} 
