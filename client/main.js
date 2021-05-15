const API_URL = 'http://localhost:5000/videos';
const videosElement = document.querySelector('#videos');
const filterInput = document.querySelector('#filter');

let allVideos;
let videoElementById = {};

filterInput.addEventListener('keyup', filterList(event));

fetch(API_URL)
    .then(res => res.json())
    .then(videos => {
        allVideos = videos;
        videos.forEach(video => {
            const link = document.createElement('a');
            link.href = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;

            const videoElement = document.createElement('div');
            videoElement.className = 'media';
            videoElementById[video.id] = videoElement;
    
            const img = document.createElement('img');
            const imageRes = video.snippet.thumbnails.standard || video.snippet.thumbnails.medium || video.snippet.thumbnails.high;
            img.src = imageRes.url;
            videoElement.appendChild(img);
    
            const mediaBody = document.createElement('div');
            mediaBody.className = 'media-body';
            videoElement.appendChild(mediaBody);
    
            const h5 = document.createElement('h5');
            h5.textContent = video.snippet.title;
            mediaBody.appendChild(h5);
    
            link.appendChild(videoElement);
            videosElement.appendChild(link);

        })
    })

function filterList(event) {
    if(!allVideos) return;

    const filter = event.target.value;

    const regExp = new RegExp(filter, 'gi');
    allVideos.forEach(video => {
        if(video.snippet.title.match(regExp)) {
            videoElementById[video.id].style.display = '';
        } else {
            videoElementById[video.id].style.display = 'none';
        }
    })
    
}