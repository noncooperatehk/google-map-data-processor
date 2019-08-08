import "regenerator-runtime/runtime"; //must include this, otherwise Babel does not work.
import vfile from 'to-vfile'
import frontMatterParser from './frontMatterParser'
import markDownParser from "./markDownParser";

async function splitContent(contentStr) {
    let reg = /(---[\s\S]*---[\s]*)([\s\S]*)/;
    return contentStr.match(reg).slice(1, 3); //get the second and the third element
}

async function parseFile(path) {
    let content = await vfile.read(path);
    return parseString(content.toString())
}

async function parseString(contentStr) {
    let [frontMatter, mdContent] = await splitContent(contentStr);
    let frontMatterJson = await frontMatterParser.parseFrontMatterString(frontMatter);
    let markDownAST = await markDownParser.mdStringToAST(mdContent);
    return [frontMatterJson, markDownAST, mdContent];
}

const highLevelParser = {
    parseString,
    parseFile
};

export {
    frontMatterParser,
    markDownParser,
    highLevelParser
}

export default highLevelParser
