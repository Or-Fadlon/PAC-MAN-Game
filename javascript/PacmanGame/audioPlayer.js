class PacmanSound {
  constructor() {
    this.dict = {
      opening: "./resources/audios/opening_song.ogg",
      siren: "./resources/audios/siren.ogg",
      die: "./resources/audios/die.ogg",
      eat: "./resources/audios/eating.short.ogg",
    };
    this.loopers = [];
  }

  Play(sound_name, loop = false) {
    let audio = new Audio(this.dict[sound_name]);
    if (loop) {
      this.loopers.push(audio);
    }
    audio.loop = loop;
    audio.play();
  }

  Stop() {
    this.loopers.forEach(element => {
      element.stop();
    });
  }
}
export { PacmanSound };
