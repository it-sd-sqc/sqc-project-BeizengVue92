import { strict as assert } from 'node:assert';
import { closeSync, openSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'node-html-parser';
// import pkg from 'svgoban';
// const { serialize } = pkg;

const srcPath = 'data/greeceAndBabylon.html';
const dstPath = 'docs/generated-schema.sql';
const chapterIds = [
  'chap01',
  'chap02',
  'chap03',
  'chap04',
  'chap05',
  'chap06',
  'chap07',
  'chap08',
  'chap09',
  'chap10',
  'chap11',
  'chap12',
  'chap13',
  'chap14',
]


// Base SQL query
const sqlHeader = `DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  chapter_id SERIAL PRIMARY KEY,
  chapter_title TEXT NOT NULL,
  chapter_body TEXT NOT NULL
);


INSERT INTO chapters (chapter_title, chapter_synopsis, chapter_body) VALUES
`


const gobanConfig = {
  size: 19,
  theme: 'classic',
  coordSystem: 'A1',
  noMargin: false,
  hideMargin: false
}


// Extraction functions
const extractTitle = function (root, id) {
  const title = root.querySelector(`${id} .chap_sub`);
  return title;
}
