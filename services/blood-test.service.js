import axios from 'axios';
import fuzzysort from 'fuzzysort';
// import DUMMY_DATA from "./dummydata"; // for dev purposes

export const bloodTestService = { getConfig, getTestNameSuggestions };

async function getConfig() {
  try {
    const url = 'https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json';
    const res = await axios.get(url);
    await new Promise(resolve => setTimeout(resolve, 2000)); // simulate delay
    return res.data.bloodTestConfig;
    // setTestConfig(DUMMY_DATA.bloodTestConfig); // for dev purposes:
  } catch (err) {
    console.error('Error fetching blood test config:', err);
  }
}

function getTestNameSuggestions(query, testConfig) {
  const words = query.match(/[a-z'\-]+/gi) || []; // seperate the query to words
  const options = {
    key: 'name',
    allowTypo: true,
    limit: 3,
  };
  const results = words.map(word => fuzzysort.go(word, testConfig, options)); // search each word separately
  results.push(fuzzysort.go(query, testConfig, options)); // search entire sentence
  const hashMap = {};
  return results
    .flat()
    .sort((a, b) => b.score - a.score)
    .sort((a, b) => b.indexes.length - a.indexes.length) // sort by scores, then by common letters
    .filter(
      result => (hashMap.hasOwnProperty(result.target) ? false : (hashMap[result.target] = true)) // remove duplicates
    );
}
