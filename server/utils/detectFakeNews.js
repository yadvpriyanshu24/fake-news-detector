const suspiciousWords = [
 "shocking",
 "miracle",
 "secret",
 "breaking",
 "100% guarantee",
 "cure",
 "exposed",
 "must watch",
 "truth revealed",
 "click here",
 "viral",
 "unbelievable"
];

const trustedSources = [
 "bbc",
 "reuters",
 "the hindu",
 "ndtv",
 "cnn",
 "times of india"
];

const categories = {
 Health: [
  "health",
  "medicine",
  "doctor",
  "cure",
  "virus",
  "covid",
  "vaccine",
 ],

 Politics: [
  "government",
  "minister",
  "president",
  "election",
  "politics",
  "parliament",
 ],

 Finance: [
  "money",
  "stock",
  "bank",
  "investment",
  "bitcoin",
  "market",
 ],

 Technology: [
  "technology",
  "ai",
  "software",
  "computer",
  "phone",
  "internet",
 ],
};
const detectFakeNews = (headline, article) => {
 let score = 0;
 let reasons = [];

 const text = `${headline} ${article}`.toLowerCase();

 let detectedCategory = "General";

 for (const category in categories) {
  const found =
   categories[category].some((word) =>
    text.includes(word)
   );

  if (found) {
   detectedCategory = category;
   break;
  }
 }

 // 1. Suspicious keywords
 suspiciousWords.forEach((word) => {
  if (text.includes(word)) {
   score += 10;
   reasons.push(
    `Suspicious keyword detected: "${word}"`
   );
  }
 });

 // 2. Excessive exclamation marks
 const exclamationCount =
  (text.match(/!/g) || []).length;

 if (exclamationCount > 3) {
  score += 15;
  reasons.push(
   "Excessive exclamation marks detected"
  );
 }

 // 3. ALL CAPS headline
 if (
  headline === headline.toUpperCase() &&
  headline.length > 10
 ) {
  score += 20;
  reasons.push(
   "Headline uses excessive capital letters"
  );
 }

 // 4. Very short content
 if (article.length < 60) {
  score += 15;
  reasons.push("Article content is too short");
 }

 // 5. Too many sensational words
 const sensationalCount =
  suspiciousWords.filter((word) =>
   text.includes(word)
  ).length;

 if (sensationalCount >= 3) {
  score += 15;
  reasons.push(
   "Too many sensational claims found"
  );
 }

 // 6. Trusted source bonus
 const isTrusted = trustedSources.some(
  (source) => text.includes(source)
 );

 if (isTrusted) {
  score -= 20;
  reasons.push(
   "Trusted news source referenced"
  );
 }

 // Prevent negative score
 score = Math.max(score, 0);

 let result = "";

 if (score >= 60) {
  result = "Likely Fake";
 } else if (score >= 30) {
  result = "Suspicious";
 } else {
  result = "Likely Genuine";
 }

 return {
  result,
  confidence: Math.min(score, 100),
  reasons,
  category: detectedCategory,
 };
};

module.exports = detectFakeNews;