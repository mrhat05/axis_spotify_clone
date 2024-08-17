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
    pause_msc_btn.src="/SVG'S/playing.svg"
    pause_msc_btn.classList.remove("fade_out")
    pause_msc_btn.classList.add("fade_in")
}

async function musicbtns_change_playing_to_play(){
    let pause_msc_btn=document.querySelector('.musicbtns').getElementsByTagName('img')[1]
    pause_msc_btn.classList.remove("fade_in")
    pause_msc_btn.classList.add("fade_out")
    await delayms(50)
    pause_msc_btn.src="/SVG'S/play.svg"
    pause_msc_btn.classList.remove("fade_out")
    pause_msc_btn.classList.add("fade_in")
}

async function change_play_to_playing(ind){
    let div_play=document.querySelectorAll(".playnow");
    let playimg= div_play[ind].querySelector("img");
    playimg.classList.remove("fade_in")
    playimg.classList.add("fade_out")
    await delayms(50)
    playimg.src="/SVG'S/playing.svg"
    playimg.classList.remove("fade_out")
    playimg.classList.add("fade_in")
}
async function change_playing_to_play(ind){
    let div_play=document.querySelectorAll(".playnow");
    let playimg=div_play[ind].querySelector("img");
    playimg.classList.remove("fade_in")
    playimg.classList.add("fade_out")
    await delayms(50)
    playimg.src="/SVG'S/play.svg"
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
        let rect = seekbar2.getBoundingClientRect();
        if (seeker.style.left >= rect.width + 'px') {
            seekbar.style.width = `${rect.width}px`;
            seeker.style.left = `${rect.width}px`;
        }
    }
    
function updateseekbar2(e){
    if(isseeking){
        let rect = seekbar2.getBoundingClientRect();
        let seekerX = e.clientX - rect.left;
        if (e.clientX > rect.width + rect.left) {
            seekbar.style.width = `${rect.width}px`;
            seeker.style.left = `${rect.width}px`;
        } else if (e.clientX < rect.left) {
            seekbar.style.width = `${0}px`;
            seeker.style.left = `${0}px`;
        } else {
            seekbar.style.width = `${seekerX}px`;
            seeker.style.left = `${seekerX}px`;
        }

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
            let rect=seekbar2.getBoundingClientRect();
            if(dur){
                const new_width = (currtime / dur) * rect.width;
                seekbar.style.width = `${new_width}px`;
                seeker.style.left=`${new_width}px`;
                document.querySelector(".timings").innerHTML=`${sectomin(currentAudio.currentTime)}/${sectomin(currentAudio.duration)}`
            }
            if(currtime>=dur){
                seekbar.style.width = `${rect.width}px`;
                seeker.style.left = `${rect.width}px`;
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
    let card_cont=document.querySelector(".cardContainer");
    let htmlString1 = "";
    let htmlString2 = "";
    songs.forEach(song => {
        let songTitle = decodeURIComponent(song.split("-")[1])
        htmlString1 += `
                        <li>
                            <div class="playcard_info">
                                <img class="invert sidecardimgs" src="/SVG'S/msuic.svg" alt="">
                                <div class="info">
                                    <div>${songTitle.split('.mp')[0]}</div>
                                </div>
                            </div>
                            <div class="playnow">
                                <img class="invert sidecardimgs" src="/SVG'S/play.svg" alt="">
                            </div>
                        </li>`

        htmlString2+=`                
                <div class="card">
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true"
                            viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE">
                            <path
                                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                            </path>
                        </svg>
                    </div>
                    <img src="https://i.scdn.co/image/ab67706f0000000281722192322800ae99c2ed06" alt="">
                    <h2>${songTitle.split('.mp')[0]}</h2>
                    <p>From Super hit Telugu Songs </p>
                </div>`
    });
    
    uls.innerHTML = htmlString1;
    card_cont.innerHTML=htmlString2;

    
    Array.from(document.querySelectorAll(".songs_list li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(songs[index],index);
        });
    })

    Array.from(document.querySelectorAll(".cardContainer .card .play")).forEach((e, index) => {
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
    // window.addEventListener('resize', ()=>{
    //     const box = document.querySelector('.songs_list ul li');
    //     const rect = box.getBoundingClientRect();
    //     let inf=document.querySelector('.info');
    //     let ans=(165*rect.width)/243.1666717529297;
    //     inf.style.width=`${ans}px`;
    // });


}


getSongs();