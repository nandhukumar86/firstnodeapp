var filename = "slug-name_content_articleid.md"


var obj = ParseFileName(filename);

console.log(obj);


function ParseFileName(filename) {
    var split1 = filename.split("_")
    var split2 = split1[2].split(".")

    return {
        slugname: split1[0],
        filetranlationtype: split1[1],
        articleid: split2[0],
        extension: split2[1]
    };
}