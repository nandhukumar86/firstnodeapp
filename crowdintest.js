const crowdin = require('@crowdin/crowdin-api-client').SourceFiles;

// initialization of ProjectsGroups
const projectsGroupsApi = new crowdin({
    token: '8875528503f31ed376a0c2b9ff489bc2825e22c9b8e04b860a216a9ba7e6dd1dfd207f57952b835a',
    organization: 'kovaidev' // optional
});

// get all projects
projectsGroupsApi
    .withFetchAll(1000)
    .listProjectFiles(58)
    .then(projects => {
        console.log(projects)
    })
    .catch(error => console.error(error));
