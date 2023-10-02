SET CLIENT_ENCODING TO 'UTF8'; 
DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

INSERT INTO chapters (title) VALUES
('Inaugural Lecture.'),
('Statement of the Problem and the Evidence.'),
('The Morphology of the Compared Religions.'),
('Anthropomorphism and Theriomorphism in Asia
Minor and the Mediterranean.'),
('The Predominance of the Goddess.'),
('The Deities as Nature-Powers.'),
('The Deities as Social-Powers.'),
('Religion and Morality.'),
('Purity a Divine Attribute.'),
('The Concept of Divine Power and the
Ancient Cosmogonies.'),
('The Religious Temperament of the
Eastern and Western Peoples.'),
('Eschatologic Ideas of East and West.'),
('Babylonian, Anatolian, and Aegean Ritual.'),
('Summary of Results.');

