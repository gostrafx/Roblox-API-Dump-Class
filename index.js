const puppeteer = require('puppeteer');
const fs = require('fs');

const typeFille = process.argv[2];

if (!["json", "md", "txt", "list"].includes(typeFille)) {
    console.error("Invalid or missing file type argument. Use 'json', 'md', 'txt', or 'list'.");
    return;
}
if (typeFille === "list") {
    PrintAllTypeFille();
} else {

    (async () => {
        const baseUrl = 'https://create.roblox.com/docs/reference/engine/classes';
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.emulateTimezone('America/New_York');
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36');
        await page.setViewport({width: 1920, height: 1080});

        await page.goto(baseUrl, {waitUntil: 'networkidle2'});

        const selector = '#tree-Engine\\ API\\/Classes > div > div.MuiTreeItem-label > a';
        await page.waitForSelector(selector);
        await page.click(selector);

        const parentSelector = '#tree-Engine\\ API\\/Classes > ul > div > div > li';
        await page.waitForSelector(parentSelector);

        const data = await page.evaluate((parentSelector) => {
            const result = {};
            const items = document.querySelectorAll(parentSelector);
            items.forEach(item => {
                const children = item.querySelector('div > div:nth-child(2) > a');
                if (children) {
                    const className = children.innerText.trim();
                    result[className] = {
                        ClassName: className, link: children.href.replace('/fr-fr/', '/').trim()
                    };
                }
            });
            return result
        }, parentSelector);

        if (data) {
            CreateFile(data, typeFille);
        }

        await browser.close();
    })().catch(console.error);

    function CreateFile(data, fileType) {
        let fileContent;

        switch (fileType) {
            case "json":
                fileContent = JSON.stringify(data, null, 2);
                fs.writeFileSync('RobloxApi.json', fileContent);
                console.log('Data has been saved to RobloxApi.json');
                break;

            case "md":

                const markdownContent = Object.keys(data).map(className => {
                    const classLink = data[className].link;
                    return `- [${className}](${classLink})\n`;
                }).join('');

                fileContent = `# Roblox Engine Classes number (${data.length}) \n\n${markdownContent}`;
                fs.writeFileSync('RobloxApi.md', fileContent);
                console.log('Data has been saved to RobloxApi.md');
                break;

            case "txt":
                const textContent = Object.keys(data).map(item => {
                    const className = item
                    const classLink = data[item].link;
                    return `${className} : ${classLink} \n`;
                }).join('');
                fileContent = textContent;
                fs.writeFileSync('RobloxApi.txt', fileContent);
                console.log('Data has been saved to RobloxApi.txt');
                break;

            default:
                console.error("Invalid file type specified.");
                break;
        }
    }
}

function PrintAllTypeFille() {
    console.log("Available typeFille options: json, md, txt");
}
