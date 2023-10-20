import { closeSync, openSync, readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'node-html-parser'

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

// Base SQL query
const sqlHeader = `SET CLIENT_ENCODING TO 'UTF8'; 
DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL
);

INSERT INTO chapters (title, body) VALUES
`
const extractTitle = function (root, id) {
  const titleIdNode = root.querySelector(`h3#${id}`)
  let title = titleIdNode.querySelector('.chap_sub').innerText
  title = title.replace(/\n\s*\n/g, '\n')
  return title
}

const extractBody = function (root, id) {
  const titleIdNode = root.querySelector(`h3#${id}`);

  if (titleIdNode) {
    const content = [];
    let currentNode = titleIdNode.nextElementSibling

    while (currentNode && currentNode.tagName !== 'H3') {
      const paragraphText = currentNode.innerText.replace(/\n\s*\n/g, '\n');
      content.push(paragraphText);
      currentNode = currentNode.nextElementSibling
    }
    return content.join(' ');
  } else {
    return null;
  }
};

// Conversion //////////////////////////////////////////////
const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

// Extract guide chapters.
const chapters = []

chapterIds.forEach(
  (id) => {
    // Extract the title
    const title = extractTitle(domRoot, id)
    const body = extractBody(domRoot, id)
    chapters.push({
      title, body
    })
  }
)

// Output the data as SQL.
const fd = openSync(dstPath, 'w')
writeFileSync(fd, sqlHeader)
writeFileSync(fd, `('${chapters[0].title}', '${chapters[0].body}')`)
chapters.slice(1).forEach((data) => {
  const value = `,\n('${data.title}', '${data.body}')`
  writeFileSync(fd, value)
})
writeFileSync(fd, ';\n\n')

closeSync(fd)
