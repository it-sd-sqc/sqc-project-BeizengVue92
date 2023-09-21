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
const sqlHeader = `DROP TABLE IF EXISTS chapter;
DROP TABLE IF EXISTS page;
DROP TABLE IF EXISTS paragraph;

CREATE TABLE chapter (
  chapter_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  total_pages INT NOT NULL
);

INSERT INTO chapter (title, total_pages) VALUES
` 
// CREATE TABLE page (
//   page_id SERIAL PRIMARY KEY,
//   chapter_id INT FOREIGN KEY,
//   page_number INT NOT NULL,
//   total_paragraphs INT NOT NULL
// );

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
const extractTitle = function (root, id) {
  const title = root.querySelector(`${id} .chap_sub`)
  return title
}

const extractTotalPage = function (root, id) {
  const totalPage = 0;
  const pagenum = root.querySelector(`${id} .pagenum`)
  foreach(pagenum) {
    totalPage++
  }
  return totalPage
}

// Extract guide chapters.
const chapters = []

