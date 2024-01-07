document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("customAudio");
  const playBtn = document.getElementById("playBtn");
  const seekSlider = document.getElementById("seekSlider");
  const seekForward = document.getElementById("seekForward");
  const search = document.querySelector("search-bar");
  const element = document.querySelectorAll(".card");
  const content = document.querySelector(".content");
  const cardButton = document.querySelectorAll("#cardbtn");
  const previousButton = document.getElementById("previous-button");
  const div2 = document.createElement('div');
  const musicSource = document.getElementById("#source1"); // Fixed typo here
  const h2 = document.createElement('h2');
  const upperSection = document.querySelector("#playlist .upper");
  const lowerSection = document.querySelector("#playlist .lower");
  let image = [];
  let mainImg;

  let imageElement = document.createElement('img');

  async function musicSearch() { // Changed function name to follow conventions
    try {
      const musicApi = await fetch("http://127.0.0.1:5500/essential/music/");
      const tempResponse = await musicApi.text();
      return tempResponse;
    } catch (error) {
      console.error("Error fetching music:", error);
      return null;
    }
  }

  async function main() {
    const response = await musicSearch();
    if (!response) return; // Exit function if fetching fails

    div2.innerHTML = response;
    let musicLinks = div2.getElementsByTagName('a');
    for (const a of musicLinks) {
      if (a.href.endsWith(`${mainImg}.mp3`)) {
        musicSource.setAttribute("src", a);
        console.log(musicSource);
        audio.load();
        let currenttimetext = audio.currentTime;
        let durationtimetext = audio.duration;
        playMusic();
      }
    }
  }
  function seektimeupdate() {
    if (audio.duration) {
      var nt = audio.currentTime * (100 / audio.duration);
      seekSlider.value = nt;
      var curmins = Math.floor(audio.currentTime / 60);
      var cursecs = Math.floor(audio.currentTime - curmins * 60);
      var durmins = Math.floor(audio.duration / 60);
      var dursecs = Math.floor(audio.duration - durmins * 60);
      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }
      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }
      if (curmins < 10) {
        curmins = "0" + curmins;
      }
      if (durmins < 10) {
        durmins = "0" + durmins;
      }
      currenttimetext.innerHTML = curmins + ":" + cursecs;
      durationtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
      currenttimetext.innerHTML = "00" + ":" + "00";
      durationtimetext.innerHTML = "00" + ":" + "00";
    }
  }
  playBtn.addEventListener("click", () => {
    playMusic();
  });

  function playMusic() {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
     <rect x="0" y="13" width="4" height="5" fill="white">
       <animate attributeName="height" attributeType="XML"
         values="5;21;5" 
         begin="0s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="y" attributeType="XML"
         values="13; 5; 13"
         begin="0s" dur="0.6s" repeatCount="indefinite" />
     </rect>
     <rect x="10" y="13" width="4" height="5" fill="white">
       <animate attributeName="height" attributeType="XML"
         values="5;21;5" 
         begin="0.15s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="y" attributeType="XML"
         values="13; 5; 13"
         begin="0.15s" dur="0.6s" repeatCount="indefinite" />
     </rect>
     <rect x="20" y="13" width="4" height="5" fill="white">
       <animate attributeName="height" attributeType="XML"
         values="5;21;5" 
         begin="0.3s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="y" attributeType="XML"
         values="13; 5; 13"
         begin="0.3s" dur="0.6s" repeatCount="indefinite" />
     </rect>
</svg>`;
    } else {
      audio.pause();
      playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  }

  seekForward.addEventListener("click", () => {
    audio.currentTime += 2;
  });

  seekSlider.addEventListener("input", () => {
    audio.currentTime = seekSlider.value;
  });
  audio.addEventListener("timeupdate", () => {
    // const progress = (audio.currentTime / audio.duration)*100;
    // seekSlider.value =progress;
    seektimeupdate();
  });


  function styleImage() {
    setTimeout(() => {
      h2.style.display = "none";
      imageElement.style.display = "flex";
      imageElement.style.width = '25vw';
      imageElement.style.marginLeft = '23vw';
      imageElement.style.borderRadius = '20px';
      imageElement.style.height = '50vh';
    }, 200);
    h2.classList.add("loader");
  }

  for (const elements of element) {
    elements.addEventListener("click", () => {
      element.forEach(el => {
        el.style.display = "none";
        image.push(el);
      });
      mainImg = elements.id;
      imageElement.setAttribute('src', `./${mainImg}.webp`);
      content.appendChild(imageElement);
      content.appendChild(h2);
      imageElement.style.display = "none";
      main();
      styleImage();
      applyStyles(mediaQuery, mediaQuery2);
      mediaQuery.addListener(applyStyles);
      mediaQuery2.addListener(applyStyles);
    });
  }

  previousButton.addEventListener("click", () => {
    setTimeout(() => {
      if (imageElement.style.display === "flex") {
        content.removeChild(h2);
        for (const el of element) {
          el.style.display = "flex";
        }
      }
    }, 200);
    content.removeChild(imageElement);
    h2.style.display = "block";
  });

  for (const ele of element) {
    ele.onmouseover = () => {
      let btn = ele.querySelector("button");
      btn.style.display = "flex";
      btn.classList.add("slide-up-fade-out");
    };
    ele.onmouseout = () => {
      let btn = ele.querySelector("button");
      btn.classList.remove("slide-up-fade-out");
      btn.style.display = "none";
    };
  }









  const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
  const mediaQuery2 = window.matchMedia("(max-width: 767px)"); // Fixed the media query string

  // Fixed the typo in content.style.display
  function applyStyles(mq1, mq2) {
    if (mq1.matches) {
      for (const elements of element) {
        elements.className = "mediaquire";
        elements.style.display = "none";
        elements.style.minWidth = "0px !important"
        elements.style.padding = "0";
        imageElement.className = "mediaquire"
        imageElement.style.marginLeft = "-100px !important";
        imageElement.style.maxHeight = "30vh"
        imageElement.style.minWidth = "30vw"
        imageElement.style.marginRight = "10vw";
        imageElement.style.marginTop = "15vh"
        imageElement.style.overflowY = "hidden"
        imageElement.style.overflowX = "hidden"
      }
      // Adjust other elements accordingly for mq1
    } else if (mq2.matches) {
      for (const elements of element) {
        elements.classList.add("mediaquire2") 
        // elements.style.display = "none !important";
        // elements.style.width = "57vw !important";
        // elements.style.marginLeft = "13vw !important";
        // elements.style.borderRadius = "20px !important";
        // elements.style.height = "50vh !important";
        
      }
      imageElement.style.marginLeft="20vw"
      content.style.display = "flex-box"; // Fixed the typo in content.style.display
      // Other adjustments for smaller screens (mq2)
    }
  }

  // Call the function initially to set styles based on the initial viewport size


  main();
});
