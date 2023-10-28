import { PageElement } from "./pageElement.js";
import { PageStyle } from "./pageStyle.js";


export class Header extends PageElement {

    constructor(data) {
        super();
        this.isPageHeader = true;
        this._title = "Page";

        if(data) this.generate(data);
    }

    generate(data) {
        this.data = `<header>
`;

        this.isGenerated = true;
    }

    set title(value) {
        this._title = value;
        this.isGenerated = false;
    }

    get title() {
        return this._title;
    }

    get style() {
        return this._style;
    }
}