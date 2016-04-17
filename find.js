//var console = require("console");
console.log("Find portrait videos and convert to pillar box landscape, so they can play on Plex");
var dir = require('node-dir');



var ffmpeg = require('fluent-ffmpeg'),
    pathToVideo = '/mnt/4tb-master/Media/Home Movies/';//portrait
    //pathToVideo = '/mnt/4tb-master/Media/Home Movies/random-amber/20140927_160057.mp4';//landscape
    //pathToVideo = '/mnt/4tb-master/Media/Home Movies/random-amber/20140825_081819.mp4';//landscape





//
//Compile array of files to inpect to find portrait videos
//


var paths = 'doIexists?'
newFiles = ['test']


function find_all_files_paths(pathToVideo){
    dir.files(pathToVideo, function(err, files) {
        if (err) throw err;

        files.sort()
        
        remove_unwanted_files(files)
         //_this.newFiles = _newFiles
        //console.log('newFiles'+ newFiles)
    });

}

function remove_unwanted_files(files){
    files.filter(function(path) { 
        //Get the filename off the end of the file path 
        var pathSplit = path.split("/");
        fileName = pathSplit.pop()
     
        //remove any file which starts with a dot
        if(fileName.match(/^[^\.].*$/)){
            newFileName = pathSplit.join('/') + '/' +  fileName
            //console.log('match! '+ newFileName)
            newFiles.push(newFileName)
            //return newFileName
        }
    });
    find_portrait_videos(newFiles)
}

function find_portrait_videos(files){
    //console.log('find_portrait_videos '+ files)

    for(var i = 0; i < files.length; i++)
    {
        path = files[i]
        console.log('path in loop '+ path)        
        ffmpeg.ffprobe(path, function(err, data) {
        if(err) { console.log(err); return; }

            if(data.streams.length && data.streams[1].tags) {
                //console.log(data.streams[0])
                switch(data.streams[0].tags.rotate) {
                    case '90':

                        var pathSplit = path.split("/");
                        fileName = pathSplit[pathSplit.length-1]
                        console.log("case 90 for file: " + fileName)
                        // /mnt/4tb-master/Media/Home Movies/random-amber/20140125_093709_pillarboxed_8.mp4
                    break;
                }
            }
        })
    }
    
}




find_all_files_paths(pathToVideo)









/*
dir.readFiles(pathToVideo,
    function(err, content, next) {
        if (err) throw err;
        console.log('content:', content);
        next();
    },
    function(err, files){
        if (err) throw err;
        console.log('finished reading files:', files);
    });


*/

/*



ffmpeg.ffprobe(pathToVideo, function(err, data) {
    if(err) { console.log(err);	return; }

    if(data.streams.length && data.streams[1].tags) {
        console.log(data.streams[0])
	switch(data.streams[0].tags.rotate) {
            case '90':
		// /mnt/4tb-master/Media/Home Movies/random-amber/20140125_093709_pillarboxed_8.mp4
                console.log("case 90")
		break;
        }
    }
})
*/
