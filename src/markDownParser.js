import unified from "unified";
import markdown from 'remark-parse'
import vfile from 'vfile';
import toVfile from 'to-vfile';

const processor = unified().use(markdown);

async function mdStringToAST(contentStr) {
    return processor.parse(vfile(contentStr))
}

async function mdFileToAST(filePath) {
    let file = toVfile.read(filePath);
    return processor.parse(file);
}

export default {
    mdStringToAST,
    mdFileToAST
}