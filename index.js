
const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://apihub.document360.info/v1',
  headers: { 'Content-Type': 'application/json', 'api_token': '51xI6pLagkrhBUM9QQOE6k7XFnbZYROx8krdClXBxJsnOZUTAjmPzn4oJ4Pushs1nGHgpKxYCN84bCDEtqkg+6O6oUzbfSOx4zyuiOGhnNFy6b6m+sIxxL3dfARR5megBF9mvqs5woW492B5QHe/TA==' }
});


let projectVersionId = '';
let files = [];

let roots = {
  'Project': 'data',
};

files.push({
  id: '0',
  name: 'Parent',
  parent_id: 'Parent',
  node_type: 'folder',
});


instance.get('/ProjectVersions')
  .then(function (res) {
    projectVersionId = res.data.data[0].id;

    instance.get(`/ProjectVersions/${projectVersionId}/categories`)
      .then(function (res) {
        res.data.data.map(c => {
          Recursion('category', c, 'Parent');
        })

      });
  });


  d360Instance.get('/ProjectVersions')
    .then(function (res) {
      projectVersionId = res.data.data[0].id;
    })
    .then(() => {
      Promise.all(Object.keys(roots).map(t =>
        d360Instance.get(`/ProjectVersions/${projectVersionId}/articles`)
      ))
        .then(responses => { 
          responses.forEach((r, index) => { 
 
            files.push(
              ...r[roots[Object.keys(roots)[index]]].data.map(f => ({ 
                ...f,
                node_type: nodeTypes.FILE,
                type: 'md',
                name: f.slug || (f.settings || {}).title || f.id,
                fid: f.name,
                parent_id: 0
              })))
          });
          res.send(files);
        })
        .catch(catchRejection('Cant fetch integration data', res));
    });


function Recursion(nodetype, obj, parent) {

  if (nodetype == 'article') {
    console.log(`item:${obj.title} parent:${parent}`);
  }

  if (nodetype == 'category') {
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
