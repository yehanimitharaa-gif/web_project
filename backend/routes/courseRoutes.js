const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/suggest', (req, res) => {
  const { zScore, district, stream } = req.body;
  const numericZ = parseFloat(zScore);

  console.log(`Received request -> Stream: ${stream}, District: ${district}, Z-Score: ${numericZ}`);

  // පළමුව අදාළ stream එකට සජීවීව database එකේ ඇති සියලුම courses ගෙන්වා ගනිමු
  const query = `SELECT * FROM courses WHERE LOWER(TRIM(stream)) = LOWER(TRIM(?))`;

  db.all(query, [stream], (err, rows) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ success: false, message: err.message });
    }

    console.log(`Found ${rows.length} courses for stream: ${stream}`);

    const suggestions = rows
      .map(course => {
        let cutoffs = {};
        try {
          cutoffs = JSON.parse(course.districtCutoffs || '{}');
        } catch (e) {
          cutoffs = {};
        }

        // දිස්ත්‍රික්කයේ නම case-insensitive ලෙස බැලීම
        const matchingDistrictKey = Object.keys(cutoffs).find(
          d => d.toLowerCase() === district.toLowerCase()
        );

        const cutoffZ = matchingDistrictKey ? cutoffs[matchingDistrictKey] : null;
        
        // පරීක්ෂාව සඳහා cutoff නැතත් දත්ත පෙන්වීමට අවශ්‍ය නම් පහත condition එක adjust කළ හැක
        if (cutoffZ === undefined || cutoffZ === null) return null;

        const diff = numericZ - cutoffZ;
        
        let chance = 'Reach';
        if (diff >= 0.2) chance = 'Safe';
        else if (diff >= 0) chance = 'Likely';

        return {
          ...course,
          districtCutoffs: cutoffs,
          cutoff: cutoffZ,
          margin: Math.round(diff * 100) / 100,
          chance
        };
      })
      .filter(Boolean);

    console.log(`Returning ${suggestions.length} valid suggestions.`);
    res.json({ success: true, data: suggestions });
  });
});

// අදාළ university එකට අදාළ courses ලබා ගැනීමට
router.get('/university/:shortName', (req, res) => {
  const { shortName } = req.params;
  const query = `SELECT * FROM courses WHERE LOWER(TRIM(shortName)) = LOWER(TRIM(?))`;

  db.all(query, [shortName], (err, rows) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ success: false, message: err.message });
    }

    const courses = rows.map(course => {
      let cutoffs = {};
      let yearContent = [];
      let jobMarket = {};
      try {
        cutoffs = JSON.parse(course.districtCutoffs || '{}');
        yearContent = JSON.parse(course.yearContent || '[]');
        jobMarket = JSON.parse(course.jobMarket || '{}');
      } catch (e) {}

      return {
        ...course,
        districtCutoffs: cutoffs,
        yearContent,
        jobMarket
      };
    });

    res.json({ success: true, data: courses });
  });
});

module.exports = router;