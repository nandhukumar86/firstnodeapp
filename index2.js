
const axios = require('axios');

const integrationApiClient = axios.create({
    baseURL: 'https://apihub.document360.info/v1',
    headers: { 'Content-Type': 'application/json', 'api_token': '51xI6pLagkrhBUM9QQOE6k7XFnbZYROx8krdClXBxJsnOZUTAjmPzn4oJ4Pushs1nGHgpKxYCN84bCDEtqkg+6O6oUzbfSOx4zyuiOGhnNFy6b6m+sIxxL3dfARR5megBF9mvqs5woW492B5QHe/TA==' }
});

integrationApiClient.get('/ProjectVersions')
    .then(res => {
        return Promise.all(res.data.data.map(v => integrationApiClient.get(`/ProjectVersions/${v.id}/articles`)))
    })
    .then(versions => {
        data = []
        versions.forEach(version => {
            version.data.data.forEach(article => {
                data.push(article);
            })
        });
        return data;
    })
    .then(articles => {
        integrationFilesList = articles;
        // get all selected source files from Crowdin
        return Promise.all(Object.keys(filesTranslations).map(fId => crowdinApi.sourceFilesApi.getFile(projectId, fId)))
    })
    .then(responses => {
        // Store selected files responses on filesById
        filesById = responses.reduce((acc, fileData) => ({ ...acc, [`${fileData.data.id}`]: fileData.data }), {});
        // Get all selected files source campaigns
        return Promise.all(Object.values(filesById).map(f => {
            return integrationApiClient.get(`/Articles/${ParseFileName(f.name).articleId}`)
        }))
    })
    .then(integrationFiles => {
        // Store campaigns date on object by id
        integrationFilesById = integrationFiles.reduce((acc, fileData) => ({ ...acc, [`${fileData.id}`]: fileData }), {});
        // For each selected translation build translation on Crowdin by file id and language
        return Promise.all(translations.map(t =>
            crowdinApi.translationsApi.buildProjectFileTranslation(projectId, t.fileId, { targetLanguageId: t.languageId, exportAsXliff: false })
        ))
    })
    .then(responses => {
        // Get all links for translations build, get date for each link
        return Promise.all(responses.map(r => axios.get(r.data.url)))
    })
    .then(buffers => {
        // Get array of translations content
        const translatedFilesData = buffers.map(b => b.data);
        resolve({ filesById, integrationFilesById, integrationFilesList, translatedFilesData })
    })
    .catch(e => reject(e))