console.log("hi");
function delayms(ms){
    return new Promise(resolve => setTimeout(resolve, ms));

}
function sectomin(seconds) {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = remainingSeconds.toString().padStart(2, '0');

    return `${minutesString}:${secondsString}`;
}
async function musicbtns_change_play_to_playing(){
    let pause_msc_btn=document.querySelector('.musicbtns').getElementsByTagName('img')[1]
    pause_msc_btn.classList.remove("fade_in")
    pause_msc_btn.classList.add("fade_out")
    await delayms(50)
    pause_msc_btn.src='/playing.svg'
    pause_msc_btn.classList.remove("fade_out")
    pause_msc_btn.classList.add("fade_in")
}

async function musicbtns_change_playing_to_play(){
    let pause_msc_btn=document.querySelector('.musicbtns').getElementsByTagName('img')[1]
    pause_msc_btn.classList.remove("fade_in")
    pause_msc_btn.classList.add("fade_out")
    await delayms(50)
    pause_msc_btn.src='/play.svg'
    pause_msc_btn.classList.remove("fade_out")
    pause_msc_btn.classList.add("fade_in")
}

async function change_play_to_playing(ind){
    let div_play=document.querySelectorAll(".playnow");
    let playimg= div_play[ind].querySelector("img");
    playimg.classList.remove("fade_in")
    playimg.classList.add("fade_out")
    await delayms(50)
    playimg.src='/playing.svg'
    playimg.classList.remove("fade_out")
    playimg.classList.add("fade_in")
}
async function change_playing_to_play(ind){
    let div_play=document.querySelectorAll(".playnow");
    let playimg=div_play[ind].querySelector("img");
    playimg.classList.remove("fade_in")
    playimg.classList.add("fade_out")
    await delayms(50)
    playimg.src='/play.svg'
    playimg.classList.remove("fade_out")
    playimg.classList.add("fade_in")
}

let currentAudio = null;
let currplayingind=null;
let seekbar=null;
let seekbar2 = null;
let seeker=null;
let isseeking=false;

function playMusic(track,ind){
    if(!isseeking){
    let songname=document.querySelector(".songname")
    if (currentAudio && currentAudio.src === track && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        change_playing_to_play(currplayingind)
        musicbtns_change_playing_to_play()
        return
    }
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        change_playing_to_play(currplayingind)
        musicbtns_change_playing_to_play()
    }
    songname.innerHTML=decodeURIComponent(track.split("-")[1]).split('.mp')[0]
    currentAudio = new Audio(track);
    currentAudio.play();
    currplayingind=ind
    change_play_to_playing(ind)
    musicbtns_change_play_to_playing()
    
    if (!seekbar) {
        seekbar = document.querySelector(".seekbar2");
        seeker=document.querySelector('.seeker');
        seekbar2 = document.querySelector(".seekbar");
    }
    if(!isseeking && currentAudio){
        seeker.addEventListener('mousedown',startseeking)
    }
    
    currentAudio.addEventListener("timeupdate",updateseekbar)
}
    }

function seekingstop() {
        console.log("log")
        isseeking = false;
        currentAudio.play() 
        change_play_to_playing(currplayingind)
        musicbtns_change_play_to_playing()
        document.removeEventListener('mousemove',updateseekbar2)
        document.removeEventListener('mouseup',seekingstop)
    }
    
function updateseekbar2(e){
    if(isseeking){
        let rect = seekbar2.getBoundingClientRect();
        let seekerX = e.clientX - rect.left;
        if (e.clientX > rect.width + rect.left) seekbar.style.width = `${rect.width}px`;
        else if (e.clientX < rect.left) seekbar.style.width = `${0}px`;
        else seekbar.style.width = `${seekerX}px`;
        if (e.clientX > rect.width + rect.left) seeker.style.left = `${rect.width}px`;
        else if (e.clientX < rect.left) seeker.style.left = `${0}px`;
        else seeker.style.left = `${seekerX}px`;

        currentAudio.currentTime = ((seekerX) * (currentAudio.duration)) / rect.width;
    }
}
function startseeking(){
    isseeking=true;
    currentAudio.pause()
    document.addEventListener('mouseup',seekingstop)
    document.addEventListener('mousemove',updateseekbar2)
}
function updateseekbar(){
        if (currentAudio && seekbar) {
            let dur = currentAudio.duration;
            let currtime = currentAudio.currentTime;
            if(dur){
                const new_width = (currtime / dur) * 838;
                seekbar.style.width = `${new_width}px`;
                seeker.style.left=`${new_width}px`;
                document.querySelector(".timings").innerHTML=`${sectomin(currentAudio.currentTime)}/${sectomin(currentAudio.duration)}`
            }
            if(currtime===dur){
                change_playing_to_play(currplayingind)
                musicbtns_change_playing_to_play()
            }
        }
}

async function getSongs() {
    let response = await fetch("http://127.0.0.1:5500/songs/");
    let res = await response.text();
    let div = document.createElement("div");
    div.innerHTML = res;
    let as = div.getElementsByTagName("a");
    let songs = []; 
    
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    
    let uls = document.querySelector(".songs_list ul");
    let htmlString = "";
    
    songs.forEach(song => {
        let songTitle = decodeURIComponent(song.split("-")[1])
        htmlString += `
        <li>
            <div class="playcard_info">
                <img class="invert sidecardimgs" src="/msuic.svg" alt="">
                <div class="info">
                    <div>${songTitle.split('.mp')[0]}</div>
                </div>
                <div class="playnow">
                    <img class="invert sidecardimgs" src="/play.svg" alt="">
                </div>
            </div>
        </li>`
    });
    
    uls.innerHTML = htmlString;
    
    Array.from(document.querySelectorAll(".songs_list li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(songs[index],index);
        });
    })
    
    let pause_msc_btn=document.querySelector('.musicbtns').getElementsByTagName('img')[1]
    pause_msc_btn.addEventListener("click",()=>{
        if(currentAudio==null){
            playMusic(songs[0])
            currplayingind=0
            console.log(currplayingind)
            change_play_to_playing(0)
        }
        else if(!currentAudio.paused){
        currentAudio.pause();
        change_playing_to_play(currplayingind)
        musicbtns_change_playing_to_play()
        }
        else{
            currentAudio.play(); 
            change_play_to_playing(currplayingind)
            musicbtns_change_play_to_playing()
        }
    })

    let prev_music_btn=document.querySelector('.musicbtns').getElementsByTagName('img')[0]
    prev_music_btn.addEventListener("click",()=>{
        currentAudio.pause();
        if(currplayingind!=0){
            playMusic(songs[currplayingind-1],currplayingind-1)
        }
        else{
            playMusic(songs[songs.length-1],songs.length-1)
        }
    })

    let next_music_btn=document.querySelector('.musicbtns').getElementsByTagName('img')[2]
    next_music_btn.addEventListener("click",()=>{
        currentAudio.pause();
        if(currplayingind!=songs.length-1){
            playMusic(songs[currplayingind+1],currplayingind+1)
        }
        else{
            playMusic(songs[0],0)
        }
    })

}


getSongs();