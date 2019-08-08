import "regenerator-runtime/runtime";
 //must include this, otherwise Babel does not work.
import xml2js from "xml2js";
import fs from 'fs';
import util from 'util';

const fsPromise = fs.promises;
const parser = new xml2js.Parser();
const parseString = util.promisify(parser.parseString);

async function main() {
    let data = await fsPromise.readFile(__dirname + '/../resources/親共 vs 真愛港商店地圖.xml');
    let result = await parseString(data);

    console.log(util.inspect(result, false, null, true /* enable colors */));
    // console.log(result.kml.Document)
    //three points in the coordinate. the last one must be zero
}

main().catch(e => console.log(e.stack));
