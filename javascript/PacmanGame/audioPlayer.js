class PacmanSound {
  constructor() {
    this.dict = {
      opening: "./resources/audios/opening_song.ogg",
      die: "./resources/audios/die.ogg",
      eat: "./resources/audios/eating.short.ogg",
    };
  }
  Play(sound_name, loop = false) {
    let audio = new Audio(this.dict[sound_name]);
    audio.loop = loop;
    audio.play();
  }
}
export { PacmanSound };
