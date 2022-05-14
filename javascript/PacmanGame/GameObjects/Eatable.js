import {GameObject} from "./GameObject.js";

class Eatable extends GameObject {
    constructor(x, y, eatable_type) {
        super(x, y);
        this.eatable_type = eatable_type;
    }
}

export {Eatable};
