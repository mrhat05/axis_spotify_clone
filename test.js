// console.log("hi");
// function pause_the_song() {
//     currentAudio.pause()
// }
// function play_the_song() {
//     currentAudio.play()
// }
// function delayms(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// function sectomin(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     const minutesString = minutes.toString().padStart(2, '0');
//     const secondsString = remainingSeconds.toString().padStart(2, '0');
//     return `${minutesString}:${secondsString}`;
// }

// // function seeking_playing_log_change(ind) {
// //     let pause_msc_btn = document.querySelector('.musicbtns').getElementsByTagName('img')[1];
// //     pause_msc_btn.src = '/playing.svg';
// //     let playimg = document.querySelectorAll(".playnow")[ind].querySelector(`.sidecardimgs${ind}`);
// //     playimg.src = '/playing.svg';
// // }

// // function seeking_play_log_change(ind) {
// //     let pause_msc_btn = document.querySelector('.musicbtns').getElementsByTagName('img')[1];
// //     pause_msc_btn.src = '/play.svg';
// //     let playimg = document.querySelectorAll(".playnow")[ind].querySelector(`.sidecardimgs${ind}`);
// //     playimg.src = '/play.svg';
// // }

// async function musicbtns_change_play_to_playing() {
//     let pause_msc_btn = document.querySelector('.musicbtns').getElementsByTagName('img')[1];
//     pause_msc_btn.classList.remove("fade_in");
//     pause_msc_btn.classList.add("fade_out");
//     await delayms(50);
//     pause_msc_btn.src = '/playing.svg';
//     pause_msc_btn.classList.remove("fade_out");
//     pause_msc_btn.classList.add("fade_in");
// }

// async function musicbtns_change_playing_to_play() {
//     let pause_msc_btn = document.querySelector('.musicbtns').getElementsByTagName('img')[1];
//     pause_msc_btn.classList.remove("fade_in");
//     pause_msc_btn.classList.add("fade_out");
//     await delayms(50);
//     pause_msc_btn.src = '/play.svg';
//     pause_msc_btn.classList.remove("fade_out");
//     pause_msc_btn.classList.add("fade_in");
// }

// async function change_play_to_playing(ind) {
//     // let div_play = document.querySelectorAll(".playnow");
//     let playimg =  document.querySelector(`.sidecardimgs${ind}`);
//     playimg.classList.remove("fade_in");
//     playimg.classList.add("fade_out");
//     await delayms(50);
//     playimg.src = '/playing.svg';
//     playimg.classList.remove("fade_out");
//     playimg.classList.add("fade_in");
// }

// async function change_playing_to_play(ind) {
//     // let div_play = document.querySelectorAll(".playnow");
//     let playimg =  document.querySelector(`.sidecardimgs${ind}`);
//     playimg.classList.remove("fade_in");
//     playimg.classList.add("fade_out");
//     await delayms(50);
//     playimg.src = '/play.svg';
//     playimg.classList.remove("fade_out");
//     playimg.classList.add("fade_in");
// }

// let currentAudio = null;
// let currplayingind = null;
// let seekbar = null;
// let seekbar2 = null;
// let seeker = null;
// let isseeking = false;

// function playMusic(track, ind) {
//     let songname = document.querySelector(".songname");
//     if (currentAudio && currentAudio.src === track && !currentAudio.paused) {
//         currentAudio.pause();
//         currentAudio.currentTime = 0;
//         change_playing_to_play(currplayingind);
//         musicbtns_change_playing_to_play();
//         return;
//     }

//     if (currentAudio) {
//         currentAudio.pause();
//         currentAudio.currentTime = 0;
//         change_playing_to_play(currplayingind);
//         musicbtns_change_playing_to_play();
//     }
//     songname.innerHTML = decodeURIComponent(track.split("-")[1]).split('.mp')[0];
//     currentAudio = new Audio(track);
//     currentAudio.play();
//     currplayingind = ind;
//     change_play_to_playing(ind);
//     musicbtns_change_play_to_playing();

//     if (!seekbar) {
//         seekbar2 = document.querySelector(".seekbar2");
//         seeker = document.querySelector('.seeker');
//         seekbar = document.querySelector(".seekbar");
//     }

//     currentAudio.addEventListener("timeupdate", updateseekbar);
//     seeker.addEventListener("mousedown", seekingstart);
//     document.addEventListener("mousemove", updateseekbar2);
//     document.addEventListener("mouseup", seekingstop);
// }

// function updateseekbar2(e) {
//     if (isseeking) {
//         let rect = seekbar.getBoundingClientRect();
//         let seekerX = e.clientX - rect.left;
//         if (e.clientX > rect.width + rect.left) seekbar2.style.width = `${rect.width}px`;
//         else if (e.clientX < rect.left) seekbar2.style.width = `${0}px`;
//         else seekbar2.style.width = `${seekerX}px`;
//         if (e.clientX > rect.width + rect.left) seeker.style.left = `${rect.width}px`;
//         else if (e.clientX < rect.left) seeker.style.left = `${0}px`;
//         else seeker.style.left = `${seekerX}px`;

//         currentAudio.currentTime = ((seekerX) * (currentAudio.duration)) / rect.width;
//     }
// }
 
// function seekingstart(e) {
//     isseeking = true;
//     pause_the_song()
//     change_playing_to_play(currplayingind)
//     musicbtns_change_playing_to_play()
//     document.addEventListener("mouseup", seekingstop);
// }

// function seekingstop(e) {
//     isseeking = false;
//     play_the_song()
//     change_play_to_playing(currplayingind)
//     musicbtns_change_play_to_playing()
//     document.removeEventListener('click',()=>{});
// }

// function updateseekbar() {
//     if (currentAudio && seekbar) {
//         let dur = currentAudio.duration;
//         let currtime = currentAudio.currentTime;
//         let rect = seekbar.getBoundingClientRect();
//         if (dur) {
//             const new_width = (currtime / dur) * (rect.width);
//             seekbar.style.width = `${new_width}px`;
//             seeker.style.left = `${new_width}px`;
//             document.querySelector(".timings").innerHTML = `${sectomin(currentAudio.currentTime)}/${sectomin(currentAudio.duration)}`;
//         }
//         if (currtime === dur) {
//             change_playing_to_play(currplayingind);
//             musicbtns_change_playing_to_play();
//         }
//     }
// }

// async function getSongs() {
//     let response = await fetch("http://127.0.0.1:5500/songs/");
//     let res = await response.text();
//     let div = document.createElement("div");
//     div.innerHTML = res;
//     let as = div.getElementsByTagName("a");
//     let songs = [];

//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href);
//         }
//     }

//     let uls = document.querySelector(".songs_list ul");
//     let htmlString = "";
//     let i = 0;
//     songs.forEach(song => {
//         let songTitle = decodeURIComponent(song.split("-")[1]);
//         htmlString += `
//         <li>
//             <div class="playcard_info">
//                 <img class="invert sidecardimgs" src="/msuic.svg" alt="">
//                 <div class="info">
//                     <div>${songTitle.split('.mp')[0]}</div>
//                 </div>
//                 <div class="playnow">
//                     <img class="invert sidecardimgs sidecardimg${i}" src="/play.svg" alt="">
//                 </div>
//             </div>
//         </li>`;
//         i++;
//     });

//     uls.innerHTML = htmlString;

//     Array.from(document.querySelectorAll(".songs_list li")).forEach((e, index) => {
//         e.addEventListener("click", () => {
//             playMusic(songs[index], index);
//         });
//     });

//     let pause_msc_btn = document.querySelector('.musicbtns_play]')
//     // console.log(pause_msc_btn);
//     pause_msc_btn.addEventListener("click", () => {
//         if (currentAudio === null) {
//             playMusic(songs[0], 0);
//             currplayingind = 0
//             change_play_to_playing(0);
//             musicbtns_change_play_to_playing();
//         }
//         else if (currentAudio.paused === true) {
//             play_the_song()
//             console.log("pause to play");
//             change_play_to_playing(currplayingind);
//             musicbtns_change_play_to_playing();
//         }
//         else {
//             pause_the_song()
//             console.log("play to pause");
//             change_playing_to_play(currplayingind);
//             musicbtns_change_playing_to_play();
//         }
//     });

//     let prev_music_btn = document.querySelector('.musicbtns_prev')
//     prev_music_btn.addEventListener("click", () => {
//         currentAudio.pause();
//         if (currplayingind != 0) {
//             playMusic(songs[currplayingind - 1], currplayingind - 1);
//         } else {
//             playMusic(songs[songs.length - 1], songs.length - 1);
//         }
//     });

//     let next_music_btn = document.querySelector('.musicbtns_next')
//     next_music_btn.addEventListener("click", () => {
//         currentAudio.pause();
//         if (currplayingind != songs.length - 1) {
//             playMusic(songs[currplayingind + 1], currplayingind + 1);
//         } else {
//             playMusic(songs[0], 0);
//         }
//     });
// }

// function msc_btn_pause() {
//     if (currentAudio) {
//         currentAudio.pause();
//         console.log("lol2");
//         change_playing_to_play(currplayingind);
//         musicbtns_change_playing_to_play();
//     }
// }

// getSongs();
