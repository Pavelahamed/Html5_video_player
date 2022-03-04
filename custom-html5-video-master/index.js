// Select elements here
const video = document.getElementById('video');
const VideoSrc = document.getElementById('Vsrc');
const VideoOverview = document.getElementById('overview');
const videoControls = document.getElementById('video-controls');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('.playback-icons use');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');
const playbackAnimation = document.getElementById('playback-animation');
const fullscreenButton = document.getElementById('fullscreen-button');
const videoContainer = document.getElementById('video-container');
const fullscreenIcons = fullscreenButton.querySelectorAll('use');
const pipButton = document.getElementById('pip-button');
const newprogressBar = document.getElementById("newprogressBar");
const newprogress = document.getElementById("newprogress");
const videoWorks = !!document.createElement('video').canPlayType;
const listGrid = document.getElementById("list-grid")
if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
}
let setItem={
  title:"Official Video Humnava Mere Song  Jubin Nautiyal  Manoj Muntashir",
  channalName:"TRT Artugul by PTV",
  views:"8.9M",
  time:"2 months ago",
  videoScr:"",
  formetType:"video/mp4",
  poster:"" ,
  videoTime:Number(),   
  }

  // this is progressber mine width

// Add functions here

// togglePlay toggles the playback state of the video.
// If the video playback is paused or ended, the video is played
// otherwise, the video is paused
function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

// updatePlayButton updates the playback icon and tooltip
// depending on the playback state
function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (video.paused) {
    playButton.setAttribute('data-title', 'Play (k)');
  } else {
    playButton.setAttribute('data-title', 'Pause (k)');
  }
}

// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds) {

 const h = ~~(timeInSeconds / 3600);
 const m = ~~((timeInSeconds % 3600) / 60);
 const s = ~~timeInSeconds % 60;
 
  return {
    hours:h,
    minutes:m,
    seconds:s
  }
}
function timeAdd(t) {
  if (t <= 9) {
    return t ="0"+ t
  } else {
    return t 
  }
}
// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
 
  const videoDuration = Math.round(video.duration);
  console.log(videoDuration);
  const time = formatTime(videoDuration);
  duration.innerText = `${timeAdd(time.minutes)}:${timeAdd(time.seconds)}`;
  duration.setAttribute('datetime', `${timeAdd(time.minutes)}m${timeAdd(time.seconds)}s`);
}

// updateTimeElapsed indicates how far through the video
// the current playback is by updating the timeElapsed element
function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${timeAdd(time.minutes)}:${timeAdd(time.seconds)}`;
  timeElapsed.setAttribute('datetime', `${timeAdd(time.minutes)}m${timeAdd(time.seconds)}s`);
}

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress(event) {
  const vc=Math.floor(video.currentTime)
  const vd=Math.round(video.duration)
 
  const parsent=(100 / vd) * vc ;
  newprogress.style.width=parsent+'%';
  setItem.videoTime=Number(vc)
  localStorage.setItem('play',JSON.stringify(setItem))
}

function updatenewprogress(event) {
  const finalW = countPrarentWidth(event)
  const skipTo = Math.round(
   (event.offsetX / finalW) *
   Math.round(video.duration)
 );
 const time = formatTime(Math.round(skipTo));
 seekTooltip.innerHTML=`${timeAdd(time.minutes)}:${timeAdd(time.seconds)}`;
 const rect = video.getBoundingClientRect();
 seekTooltip.style.left = `${event.pageX - rect.left}px`;
 // video.currentTime = skipTo;
 //  const skipTo = Math.round(
 //   (event.offsetX / event.target.clientWidth) *
 //     parseInt(event.target.getAttribute('max'), 10)
 // );
 // console.log(event.target.clientWidth / skipTo);
 
}

// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
// function updateSeekTooltip(event) {
//   const skipTo = Math.round(
//     (event.offsetX / event.target.clientWidth) *
//     Math.round(video.duration)
//   );

//   seek.setAttribute('data-seek', skipTo);
//   const time = formatTime(skipTo);
//   // seekTooltip.textContent = `${timeAdd(time.minutes)}:${timeAdd(time.seconds)}`;
//   seekTooltip.innerHTML = `${timeAdd(time.minutes)}:${timeAdd(time.seconds)}`;
//   const rect = video.getBoundingClientRect();
//   seekTooltip.style.left = `${event.pageX - rect.left}px`;
// }

// skipAhead jumps to a different point in the video when the progress bar
// is clicked
function skipAhead(event) {
  console.log(event.target.value);
  // const skipTo=event.target.value
  const skipTo = event.target.dataset.seek
    ? event.target.dataset.seek
    : event.target.value;
    console.log(event.target.value);
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
  // video.currentTime = skipTo;
  // progressBar.value = skipTo;
  // seek.value = skipTo;

}
function skip(event) {
  const finalW = countPrarentWidth(event)
  const skipTo = Math.round(
  (event.offsetX / finalW) *
  Math.round(video.duration)
);
  video.currentTime = skipTo;
   width = parseFloat(newprogressBar.style.width);
   const parsent=(100 / finalW) * event.offsetX ;
   newprogress.style.width=parsent+'%'
}
// newprogressBar.addEventListener('click', function(event) {
//   width = parseFloat(newprogressBar.style.width);
//   var x = event.offsetX / width;  
//   video.currentTime = Math.round(x * video.duration);
//   }, false);  
  
// updateVolume updates the video's volume
// and disables the muted state if active
function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

// updateVolumeIcon updates the volume icon so that it correctly reflects
// the volume of the video
function updateVolumeIcon() {
  volumeIcons.forEach((icon) => {
    icon.classList.add('hidden');
  });

  volumeButton.setAttribute('data-title', 'Mute (m)');

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden');
    volumeButton.setAttribute('data-title', 'Unmute (m)');
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove('hidden');
  } else {
    volumeHigh.classList.remove('hidden');
  }
}

// toggleMute mutes or unmutes the video when executed
// When the video is unmuted, the volume is returned to the value
// it was set to before the video was muted
function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

// animatePlayback displays an animation when
// the video is played or paused
function animatePlayback() {
  playbackAnimation.animate(
    [
      {
        opacity: 1,
        transform: 'scale(1)',
      },
      {
        opacity: 0,
        transform: 'scale(1.3)',
      },
    ],
    {
      duration: 500,
    }
  );
}

// toggleFullScreen toggles the full screen state of the video
// If the browser is currently in fullscreen mode,
// then it should exit and vice versa.
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    // Need this to support Safari
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

// updateFullscreenButton changes the icon of the full screen button
// and tooltip to reflect the current full screen state of the video
function updateFullscreenButton() {
  fullscreenIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (document.fullscreenElement) {
    fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
  } else {
    fullscreenButton.setAttribute('data-title', 'Full screen (f)');
  }
}

// togglePip toggles Picture-in-Picture mode on the video
async function togglePip() {
  try {
    if (video !== document.pictureInPictureElement) {
      pipButton.disabled = true;
      await video.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  } catch (error) {
    console.error(error);
  } finally {
    pipButton.disabled = false;
  }
}

// hideControls hides the video controls when not in use
// if the video is paused, the controls must remain visible
function hideControls() {
  if (video.paused) {
    return;
  }

  videoControls.classList.add('hide');
}

// showControls displays the video controls
function showControls() {
  videoControls.classList.remove('hide');
}
function countPrarentWidth(event) {
  let finalW
    if (event.target.id === 'newprogress') {
      finalW=event.target.offsetParent.clientWidth
    }else{
     finalW= event.target.clientWidth
    }
  return finalW
}
function dragElement(elmnt) {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
 

  function dragMouseDown(e) {
    e.preventDefault();
    newprogressBar.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    newprogressBar.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    const finalW = countPrarentWidth(e)
    e.preventDefault();
     const parsent=( 100 / finalW) * e.offsetX ;
     const p= Math.floor(parsent)
      newprogress.style.width=p+'%'
      const skipTo = Math.round(
        (event.offsetX / finalW) *
        Math.round(video.duration)
      );
        video.currentTime = skipTo;
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    newprogressBar.onmouseup = null;
    newprogressBar.onmousemove = null;
  }
}
dragElement(newprogress)
// keyboardShortcuts executes the relevant functions for
// each supported shortcut key
function keyboardShortcuts(event) {
  const { key } = event;
  switch (key) {
    case 'k':
      togglePlay();
       animatePlayback();
      if (video.paused) {
        showControls();
      } else {
        setTimeout(() => {
          hideControls();
        }, 2000);
      }
      break;
    case 'm':
      toggleMute();
      break;
    case 'f':
      toggleFullScreen();
      break;
    case 'p':
      togglePip();
      break;
  }
}

// Add eventlisteners here
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('loadedmetadata',initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', updateVolumeIcon);
video.addEventListener('click', togglePlay);
VideoOverview.addEventListener('click', togglePlay);
VideoOverview.addEventListener('click', animatePlayback);
VideoOverview.addEventListener('mouseenter', showControls);
VideoOverview.addEventListener('mouseleave', hideControls);
video.addEventListener('click', animatePlayback);
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
newprogressBar.addEventListener('click',skip);  
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
newprogressBar.addEventListener('mousemove', updatenewprogress);
volume.addEventListener('input', updateVolume);
volumeButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullScreen);
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
pipButton.addEventListener('click', togglePip);

document.addEventListener('DOMContentLoaded', () => {
  if (!('pictureInPictureEnabled' in document)) {
    pipButton.classList.add('hidden');
  }
});
window.addEventListener('load',()=>{
  test()
  selectList()
  setVideo()
  loadVideo()
})
document.addEventListener('keyup', keyboardShortcuts);
 const overview_wrap= document.getElementsByClassName("overview-wrap");
const skipR= document.getElementById("skipR");
const skipL= document.getElementById("skipL");
const skipAll= document.getElementsByClassName("skip");

// console.log(overview_wrap);
// console.log(skipAll);


// skipR.addEventListener('click',()=>{
//   // togglePlay()
//   // animatePlayback()
//   // skipR.classList.add("opacty-none")
  
// })
// skipL.addEventListener('click',()=>{
//   // togglePlay()
//   // animatePlayback()

// })
// skipR.addEventListener('dblclick',()=>{
//   console.log('dclick');
//   // skipAll.classList.add("d-none")
//   skipR.classList.remove("opacty-none")
//   setTimeout(() => {
//     console.log("ok");
//     skipR.classList.add("opacty-none")
//   },100);
//   skip(+10)

// })
// skipL.addEventListener('dblclick',()=>{
//   console.log('dclick');
//   // skipAll.classList.add("d-none")
//   skipL.classList.remove("opacty-none")
//   setTimeout(() => {
//     console.log("ok");
//     skipL.classList.add("opacty-none")
//   },100);
//   skip(-10)
// })

// overview_wrap.addEventListener('dblclick',()=>{
//   console.log('dclickover');
//   // skipAll.classList.add("d-none")
 

// })

function makeBig() { 
  video.width = 560; 
} 
function makeSmall() { 
  video.width = 320; 
} 
function makeNormal() { 
  video.width = 420; 
} 
// function skip(value) {
//       video.currentTime += value;
// }    
function restart() {
      video.currentTime = 0;
  }

 
const playList=[
 {
   title:"Official Video Humnava Mere Song  Jubin Nautiyal  Manoj Muntashir",
   channalName:"TRT Artugul by PTV",
   views:"8.9M",
   time:"2 months ago",
   videoScr:"./video/Official.mp4",
   formetType:"video/mp4",
   poster:"./videoPoster/TmRgK-pXH9c-HD.jpg"
 },
 {
  title:"Lyrical Dil Mein Ho Tum WHY CHEAT INDIA  Emraan H, Shreya DRochak K,",
  channalName:"TRT Artugul by PTV",
  views:"8.9M",
  time:"2 months ago",
  videoScr:"./video/Lyrical.mp4",
  formetType:"video/mp4",
  poster:"./videoPoster/byitAI7kkOM-HD.jpg"
},
{
  title:"Ertugrul Ghazi Urdu | Episode 59| Season 2",
  channalName:"TRT Artugul by PTV",
  views:"8.9M",
  time:"2 months ago",
  videoScr:"./video/video.mp4",
  formetType:"video/mp4",
  poster:"./videoPoster/poster.jpg"
},
{
  title:"Meherban ᴴᴰ by Munaem Billah  New Nasheed  Alokito Geani 2019  Live 🔴 1080 x 1920.mp4",
  channalName:"TRT Artugul by PTV",
  views:"8.9M",
  time:"2 months ago",
  videoScr:"./video/Meherban.mp4",
  formetType:"video/mp4",
  poster:"./videoPoster/poster.jpg"
}
]




function test() {
  playList.map((item,i)=>{
    let  div = document.createElement("div")
    div.setAttribute("class","card-custom")
    const html=`
   
    <div class="left">
      <video class="item" id="item" src="./video/video.mp4" type="video/mp4" poster=${item.poster}>
        <source src=${item.videoScr}></source>
      </video>
    </div>
    
    <div class="right">
      <div class="right-wrap ">
        <span id="video-title" class="style-scope ytd-compact-video-renderer" aria-label="Ertugrul Ghazi Urdu | Episode 59| Season 2 by TRT Ertugrul by PTV 1 year ago 45 minutes 12,421,235 views" title="Ertugrul Ghazi Urdu | Episode 59| Season 2">
          ${item.title}
        </span>
        <div id="channal">
          <span id="channal_name">${item.channalName}</span>
        </div>
        <div id="meta-block">
          <span class="style-scope ytd-video-meta-block">${item.views} views </span>
          <span class="style-scope ytd-video-meta-block"> ${item.time}</span>
        </div>
      </div>
    </div>
 
    `
    div.innerHTML=html
    listGrid.appendChild(div)
   
  })

 
  // console.log(src);
  // video.src="./video/video.mp4"
  // togglePlay()
}


function selectList() {
  const cardCustom=document.querySelectorAll(".card-custom")
  console.log(cardCustom);


cardCustom.forEach(item => {
  item.addEventListener('click',(e)=>{
   
  const Vsrc=item.childNodes[1].childNodes[1].childNodes[1].src;
  const Vposter=item.childNodes[1].childNodes[1].poster;
        video.src=Vsrc;
        VideoSrc.src=Vsrc
        video.poster=Vposter;
      console.log(VideoSrc);

      togglePlay()
        setItem.videoScr=Vsrc;
         setItem.poster=Vposter;
        localStorage.setItem('play',JSON.stringify(setItem))
  })
});
}
function setVideo() {
  const data=JSON.parse(localStorage.getItem("play"));
   video.src=data.videoScr;
   VideoSrc.src=data.videoScr;
   video.poster=data.poster;
   video.currentTime=data.videoTime
  
}
  
  // newprogress.addEventListener('mousedown',dragElement)


 
//  fetch("https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=UxxajLWwzqY&geo=DE", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
// 		"x-rapidapi-key": "251504861amshee196b069a66c57p10a121jsn93bd122ee717"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });
async function loadVideo() {
  try {
    // const res = await fetch("https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=vlaf1Au6x1E", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
    //     "x-rapidapi-key": "251504861amshee196b069a66c57p10a121jsn93bd122ee717"
    //   }
    // })
    const res = await  fetch("https://youtube-video-download-info.p.rapidapi.com/dl?id=UxxajLWwzqY", {
      "method": "GET",
      "headers": {
        'Access-Control-Allow-Credentials' : true,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'application/json',
        "x-rapidapi-host": "youtube-video-download-info.p.rapidapi.com",
        "x-rapidapi-key": "251504861amshee196b069a66c57p10a121jsn93bd122ee717"
      },
    })
    const data = await res.json()
     console.log(data);
    // console.log(data.link[243][0]);
    video.src=data.link[398][0]
    //  video.src=data[0].url
  } catch (e) {
    console.log(e);
  }
}
