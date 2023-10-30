import React, { useState } from 'react';
import './contributions.css';
import axios from 'axios';

const aggregateData = (githubData, leetcodeData) => {
  const contributions = {};

  // Standardize date to ISO string and aggregate GitHub data
  githubData.forEach(({ date, count }) => {
    const isoDate = new Date(date).toISOString().split('T')[0];
    if (!contributions[isoDate]) {
      contributions[isoDate] = { githubCount: 0, leetcodeCount: 0, source: new Set() };
    }
    contributions[isoDate].githubCount += count;
    contributions[isoDate].source.add('github');
  });

  // Standardize date to ISO string and aggregate LeetCode data
  leetcodeData.forEach(({ date, count }) => {
    const isoDate = new Date(date).toISOString().split('T')[0];
    if (!contributions[isoDate]) {
      contributions[isoDate] = { githubCount: 0, leetcodeCount: 0, source: new Set() };
    }
    contributions[isoDate].leetcodeCount += count;
    contributions[isoDate].source.add('leetcode');
  });

  return contributions;
};

const renderSquares = (aggregatedData, year) => {
  const squares = [];
  let date = new Date(year, 0, 1);  // Start from Jan 1 of the year
  for (let i = 0; i < 365; i++) {  // Assuming non-leap year; if leap year matters, adjust this
    const isoDate = date.toISOString().split('T')[0];
    const data = aggregatedData[isoDate] || { githubCount: 0, leetcodeCount: 0, source: new Set() };
    
    // Determine the source: 'both', 'github', 'leetcode', or 'none'
    let source;
    if (data.githubCount > 0 && data.leetcodeCount > 0) {
      source = 'both';
    } else if (data.githubCount > 0) {
      source = 'github';
    } else if (data.leetcodeCount > 0) {
      source = 'leetcode';
    } else {
      source = 'none';
    }

    squares.push(<li key={isoDate} data-level={data.githubCount + data.leetcodeCount} data-source={source}></li>);
    date.setDate(date.getDate() + 1);  // Increment the date by one day
  }
  return squares;
};

const ActivityTracker = () => {
  const [username, setUsername] = useState('');
  const [githubData, setGithubData] = useState([]);
  const [leetcodeData, setLeetcodeData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchActivity = async (e) => {
    e.preventDefault();
  
    try {
      // Fetching GitHub data using the new GitHub Contributions API
      const githubResponse = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`);
      const githubActivity = githubResponse.data.contributions.map(item => ({
        date: item.date,
        count: item.count,
      }));
      setGithubData(githubActivity);
  
      // Existing code for fetching LeetCode data
      const leetcodeResponse = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const leetcodeActivity = Object.entries(leetcodeResponse.data.submissionCalendar).map(([timestamp, count]) => {
        const dateObj = new Date(parseInt(timestamp) * 1000);
        const normalizedDateObj = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);
        const date = normalizedDateObj.toISOString().split('T')[0];
        return {
          date,
          count,
        };
      });
  
      setLeetcodeData(leetcodeActivity);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };  

  // Aggregate and render squares
  const aggregatedData = aggregateData(githubData, leetcodeData);
  console.log("Aggregated Data:", aggregatedData);  // Add this line for debugging
  const squares = renderSquares(aggregatedData, currentYear);


  return (
    <div>
      <h1>Activity Tracker</h1>
      <form onSubmit={fetchActivity}>
        <label htmlFor="username">Enter GitHub/LeetCode username: </label>
        <input type="text" id="username" required value={username} onChange={e => setUsername(e.target.value)} />
        <button type="submit">Get Activity</button>
      </form>

      <h2>Combined Contributions</h2>
      <div className="graph">
        {currentYear}
        <ul className="months">
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>
        <ul className="days">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="squares">
          {squares}
        </ul>
      </div>

      <div>
      <button onClick={() => setCurrentYear(currentYear - 1)}>Previous Year</button>
      <button onClick={() => setCurrentYear(currentYear + 1)}>Next Year</button>
      </div>
      
    </div>
  );
};

export default ActivityTracker;