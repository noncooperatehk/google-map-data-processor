import "regenerator-runtime/runtime";
//must include this, otherwise Babel does not work.
import xml2js from "xml2js";
import fs from 'fs';
import util from 'util';
import _ from 'lodash';
import vfile from 'to-vfile';
import yaml from 'js-yaml';
import uuidv4 from 'uuid/v4';

const fsPromise = fs.promises;
const parser = new xml2js.Parser();
const parseString = util.promisify(parser.parseString);

async function main() {
    let data = await fsPromise.readFile(__dirname + '/../resources/親共 vs 真愛港商店地圖 Fri Aug 09 2019 18-12-02 GMT+0800.kml');
    let _document = (await parseString(data)).kml.Document[0];
    const folderNameFilter = (folder) => {
        //親共食店
        //親共商店
        //親共連鎖店
        //愛港連鎖店 --- only handle 查理史
        //ignore other categories
        //Handling for: 下面連鎖店,分店眾多,未能逐一收錄
        //manual add locations points
        //probably we need to group the points
        return _.includes(['親共食店', '親共商店', '親共連鎖店', '愛港連鎖店'], folder.name[0])
    };

    //input xml, output a list of vfiles.
    let folders = _document.Folder.filter(folderNameFilter);
    let processed = _.flatMap(folders, handleFolder)
    console.log(`extracted ${processed.length} elements`);
    let promises = processed
        .map(generateFileContent)
        .map(tuple => {
            let [fileContent, fileName] = tuple;
            let path = `${__dirname}/../output/${fileName}`;
            return vfile.write({path, contents: fileContent});
        });
    await Promise.all(promises);
    //write the vfiles to the disk
    console.log("done")
}

function generateFileContent(parsedElement) {
    let [frontMatter, md] = parsedElement;
    let long = _.get(frontMatter, "addresses[0].longitude");
    let lat = _.get(frontMatter, "addresses[0].latitude");
    let suffix = uuidv4(`${long},${lat}`).toString().substring(0, 7);
    let fileName = `${frontMatter.name}-${suffix}.md`;
    let fileContent = `---
${yaml.dump(frontMatter)}
---
### Detail
${md}
`;
    return [fileContent, fileName];
}

function handleFolder(folder) {
    return folder
        .Placemark
        .filter(placeMarkFilter)
        .map(handlePlaceMark);
}

function placeMarkFilter(placeMark) {
    let styleUrl = _.get(placeMark, 'styleUrl[0]');
    //filter by color code
    return styleUrl.includes('A52714') || styleUrl.includes('E65100') || styleUrl.includes('F9A825');
}

function handlePlaceMark(placeMark) {
    let frontMatterJson = extractFrontMatter(placeMark);
    let md = extractMarkDown(placeMark);
    return [frontMatterJson, md];
}

function extractMarkDown(placeMark) {
    let extendedData = _.get(placeMark, 'ExtendedData[0].Data', []);
    return getDataWithAttribute("description", extendedData);
}

function extractFrontMatter(placeMark) {
    let defaultFrontMatter = {
        name: "",
        addresses: [],
        tags: [],
        previewImageUrl: "",
        id: uuidv4().toString(),
    };
    let extendedData = _.get(placeMark, 'ExtendedData[0].Data', []);
    let address = cleanStr(getDataWithAttribute("Location", extendedData));
    let name = cleanStr(_.get(placeMark, 'name[0]'));
    let group = cleanStr(getDataWithAttribute("Group", extendedData));
    let [longitude, latitude] = extractPosition(placeMark);
    let update = {
        name,
        addresses: [
            {
                address,
                longitude,
                latitude
            }
        ],
        group
    };
    return _.assign(defaultFrontMatter, update);
}

function cleanStr(maybeStr) {
    if (maybeStr) return maybeStr.replace(/\n/g, "").trim();
    return maybeStr
}

function getDataWithAttribute(attributeName, array) {
    let result = array
        .find(ele => {
            return ele['$'].name === attributeName;
        });
    if (result) return _.get(result, "value[0]");
    return undefined;
}


function extractPosition(placeMark) {
    let point = _.get(placeMark, "Point[0].coordinates[0]");
    if (point) {
        let trimmed = point.replace(/\s*/g, "");
        return _.take(trimmed.split(","), 2).map(str => Number(str));
    }
    return [];
}

main().catch(e => console.log(e.stack));
