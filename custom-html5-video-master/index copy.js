
const ytplayer=document.getElementById("ytplayer")
const player=document.getElementById("player")
//   console.log();
const YOUTUBE_API_KEY='AIzaSyCOwfQuEcb7q6NEAtqsiqHtrQy2ahQFRk4'

if (!YOUTUBE_API_KEY) {
  throw new Error("No API key is provided");
}

async function getYoutubeResults(query, resultsPerPage, pageToken) {
  let res ,errr
  console.log("Ready to get Youtube data!");
  let url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;
  if (resultsPerPage) {
    url = `${url}&maxResults=${resultsPerPage}`;
  }
  if (pageToken) {
    url = `${url}&pageToken=${pageToken}`;
  }
   try {
      const res = await fetch(url)
       return data = res.json();;
   } catch (e) {
     console.log(e);
     return false
   }
  
}


async function main() {
  const videoData = [];
  let totalPages = 10;
  let nextPageToken = undefined;
  // for (let counter = 0; counter < totalPages; counter = counter + 1) {
  //   const data = await getYoutubeResults("JavaScript", 50, nextPageToken);
  //   videoData.push(...data.items);
  //   nextPageToken = data.nextPageToken;
  // }
  const data = await getYoutubeResults("hindi song", 50, nextPageToken);
     videoData.push(...data.items);
  const videoDataJSON = JSON.stringify(videoData, null, 2);
  

 console.log(videoData[0]);
  videoData.map((v,i)=>{
    
     main2(v.id,v.snippet)
  })
}

// videoData.map((v)=>{
// dayere.innerHTML = v.snippet.title
// console.log(dayere);
// grid.appendChild(dayere)
// })
 function main2(i,s) {
  
   console.log(i.videoId);
   
  const grid = document.getElementById("gridall");
  let  div = document.createElement("div")
  const html=`
        <div onclick="playVideo('${i.videoId}')" class="card" name='${i.videoId}' style="width: 18rem;">
            <img src="${s.thumbnails.high.url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${s.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      `
    div.innerHTML= html
   grid.appendChild(div)

}

function playVideo(p) {
  const html=`
  <iframe  type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/${p}?autoplay=1&origin=http://127.0.0.1:5501/"
  frameborder="0"></iframe>`
  player.innerHTML=html
}

playVideo()
  // Load the IFrame Player API code asynchronously.

 main();
