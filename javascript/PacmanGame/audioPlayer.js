class PacmanSound {
  constructor() {
    this.dict = {
      opening: "./resources/audios/opening_song.ogg",
      siren: "./resources/audios/siren.ogg",
      die: "./resources/audios/die.ogg",
      eat: "./resources/audios/eating.short.ogg",
      eat_clock: "./resources/audios/eat_clock.ogg",
      eat_power_up: "./resources/audios/eat_life.ogg",
    };
    this.single = [];
    this.loopers = [];
    this.mute = false;
  }

  Play(sound_name, loop = false) {
    if (!this.mute) {
      let audio = new Audio(this.dict[sound_name]);
      if (loop) {
        this.loopers.push(audio);
      }
     else {
       this.single.push(audio);
     }
      audio.loop = loop;
      audio.play();
    }
  }

  Stop() {
    this.single.forEach(element => {
      element.pause();
      element.currentTime = 0;
    });
    this.single = [];
    this.loopers.forEach(element => {
      element.pause();
      element.currentTime = 0;
    });
    this.loopers = [];
  }

  MuteToggle() {
    this.mute = !this.mute;
    if (this.mute) {
      this.Stop();
    }
  }
}
export { PacmanSound };
