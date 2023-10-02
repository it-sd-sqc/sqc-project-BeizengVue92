import { strict as assert } from 'node:assert'
import { closeSync, openSync, readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'node-html-parser'

// import pkg from 'svgoban';
// const { serialize } = pkg;

const srcPath = 'data/greeceAndBabylon.html'
const dstPath = 'docs/generated-schema.sql'
const chapterIds = [
  'ch01',
  'ch02',
  'ch03',
  'ch04',
  'ch05',
  'ch06',
  'ch07',
  'ch08',
  'ch09',
  'ch10',
  'ch11',
  'ch12',
  'ch13',
  'ch14'
]

// let pageNumber = 0
// const pageIds = []

// Adding pages in pageIds array
// for (let pageCount = 1; pageCount <= 308; pageCount++) {
//   const pageStringLength = 4;
//   const initialString = 'p00';
//   let editString = initialString + pageCount.toString();
//   while (editString.length > pageStringLength) {
//     editString = editString.slice(0, 1) + editString.slice(2);
//     if (editString.length === pageStringLength) {
//       break;
//     }
//   }
//   pageIds.push(editString)
// }

// Base SQL query
const sqlHeader = `SET CLIENT_ENCODING TO 'UTF8'; 
DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

INSERT INTO chapters (title) VALUES
`
// CREATE TABLE pages (
//   page_id SERIAL PRIMARY KEY,
//   chapter_id INT FOREIGN KEY,
//   page_number INT NOT NULL,
//   total_paragraphs INT NOT NULL
// );
// const insertPagesSql = `INSERT INTO pages ()`

// DROP TABLE IF EXISTS paragraph;

// CREATE TABLE paragraph (
//   paragraph_id SERIAL PRIMARY KEY,
//   page_id INT FOREIGN KEY,
//   chapter_id INT FOREIGN KEY,
//   content TEXT NOT NULL,
//   total_words INT NOT NULL
// );

// const insertPageSQL = `INSERT INTO page (chapter_id, page_number, total_paragraphs) VALUES
// `
// const insertParagraphSQL = `INSERT INTO paragraph (page_id, chapter_id, content, total_words) VALUES
// `

const gobanConfig = {
  size: 19,
  theme: 'classic',
  coordSystem: 'A1',
  noMargin: false,
  hideMargin: false
}

// Extraction functions
// const extractChapter = function (root, id) {
//   const titleIdNode = root.querySelector(`h3#${id}`);
//   const title = extractTitle(titleIdNode);
//   const pages = extractPages(titleIdNode);
//   return { title, pages };
// };

const extractTitle = function (root, id) {
  const titleIdNode = root.querySelector(`h3#${id}`)
  let title = titleIdNode.querySelector('.chap_sub').innerText
  title = title.replace(/\n\s*\n/g, '\n')
  return title
}

// const extractBody = function (root, id, pruneChildrenSelector) {
//   const bodyNode = root.querySelector(`#${id} .divBody`)

//   if (pruneChildrenSelector) {
//     const children = bodyNode.querySelectorAll(pruneChildrenSelector)
//     children.forEach((child) => {
//       child.remove()
//     })
//   }
// }

// Conversion //////////////////////////////////////////////
const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

// Extract guide chapters.
const chapters = []

chapterIds.forEach(
  (id) => {
    // Extract the title
    const title = extractTitle(domRoot, id)
    chapters.push({
      title
    })
  }
)

// Output the data as SQL.
const fd = openSync(dstPath, 'w')
writeFileSync(fd, sqlHeader)
writeFileSync(fd, `('${chapters[0].title}')`)
chapters.slice(1).forEach((data) => {
  const value = `,\n('${data.title}')`
  writeFileSync(fd, value)
})
writeFileSync(fd, ';\n\n')
closeSync(fd)
