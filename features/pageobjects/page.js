// pageobjects/page.js
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open (path) {
        try {
            await browser.url(path);
        } catch (e) {
            console.error(`Navigation failed to path: ${path}`, e);
        }
    }
}
