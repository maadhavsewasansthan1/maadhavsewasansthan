const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'content', 'data');
const eventsDir = path.join(dataDir, 'events');
const activitiesDir = path.join(dataDir, 'activities');
const galleryDir = path.join(dataDir, 'gallery');

function readDirJson(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    try {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error(`Error parsing ${file}:`, err);
      return null;
    }
  }).filter(Boolean);
}

// 1. Process Events
const events = readDirJson(eventsDir);

// Sort logic: upcoming first, then by date if available
events.sort((a, b) => {
  if (a.status === 'upcoming' && b.status === 'past') return -1;
  if (a.status === 'past' && b.status === 'upcoming') return 1;
  if (a.date && b.date) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
  return 0;
});

fs.writeFileSync(
  path.join(dataDir, 'events.json'),
  JSON.stringify(events, null, 2),
  'utf8'
);

// 2. Process Activities
const activities = readDirJson(activitiesDir);
fs.writeFileSync(
  path.join(dataDir, 'activities.json'),
  JSON.stringify(activities, null, 2),
  'utf8'
);

// 3. Process Gallery
const gallery = readDirJson(galleryDir);
fs.writeFileSync(
  path.join(dataDir, 'gallery.json'),
  JSON.stringify(gallery, null, 2),
  'utf8'
);

console.log(`[build-content] Successfully aggregated:
- ${events.length} events -> events.json
- ${activities.length} activities -> activities.json
- ${gallery.length} gallery items -> gallery.json`);
