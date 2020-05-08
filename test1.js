var folderName = "File name dgdfgdf (54wg1gs56d4fgs1fgdfgdfgfdgfdg6s54gfdg1)";

var id = ParseArticleId(folderName);

console.log(id);

function ParseArticleId(folderName) {
    var items = folderName.split(' ')
    return items[items.length - 1].replace('(','').replace(')','');
}