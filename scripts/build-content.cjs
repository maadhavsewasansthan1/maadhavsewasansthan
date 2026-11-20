const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'content', 'data');
const eventsDir = path.join(dataDir, 'events');
const activitiesDir = path.join(dataDir, 'activities');
const galleryDir = path.join(dataDir, 'gallery');

/**
 * Normalizes an entry that could be in Decap i18n single_file structure:
 * {
 *   en: { title: "...", ... },
 *   hi: { title: "...", ... }
 * }
 * OR in legacy structure:
 * {
 *   title: { en: "...", hi: "..." },
 *   date: "...",
 *   ...
 * }
 */
function normalizeLocalizedEntry(raw, filename) {
  if (!raw || typeof raw !== 'object') return null;

  // Check if saved as { en: {...}, hi: {...} } by Decap i18n
  if (raw.en && typeof raw.en === 'object' && !Array.isArray(raw.en)) {
    const en = raw.en || {};
    const hi = raw.hi || {};
    
    // Merge all keys present in en or hi
    const allKeys = new Set([...Object.keys(en), ...Object.keys(hi)]);
    const normalized = {
      id: raw.id || filename.replace(/\.json$/, ''),
    };

    allKeys.forEach(key => {
      if (key === 'id') return;
      const enVal = en[key];
      const hiVal = hi[key];

      // If either value is different or they are strings meant to be localized
      if (typeof enVal === 'string' && typeof hiVal === 'string' && enVal !== hiVal) {
        normalized[key] = { en: enVal, hi: hiVal };
      } else if (typeof enVal === 'string' || typeof hiVal === 'string') {
        normalized[key] = { en: enVal || hiVal || '', hi: hiVal || enVal || '' };
      } else {
        // Shared value (e.g. date, image, status, category)
        normalized[key] = enVal !== undefined ? enVal : hiVal;
      }
    });

    // Ensure status, date, category, image are easily accessible at top level
    if (en.status || hi.status) normalized.status = en.status || hi.status;
    if (en.date || hi.date) normalized.date = en.date || hi.date;
    if (en.category || hi.category) normalized.category = en.category || hi.category;
    if (en.image || hi.image) normalized.image = en.image || hi.image;

    return normalized;
  }

  // Already in normalized format { id, title: { en, hi }, ... }
  if (!raw.id) {
    raw.id = filename.replace(/\.json$/, '');
  }
  return raw;
}

function readDirJson(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    try {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const parsed = JSON.parse(content);
      return normalizeLocalizedEntry(parsed, file);
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
  const statusA = (typeof a.status === 'object' ? a.status.en : a.status) || 'upcoming';
  const statusB = (typeof b.status === 'object' ? b.status.en : b.status) || 'upcoming';
  if (statusA === 'upcoming' && statusB === 'past') return -1;
  if (statusA === 'past' && statusB === 'upcoming') return 1;

  const dateA = typeof a.date === 'string' ? a.date : '';
  const dateB = typeof b.date === 'string' ? b.date : '';
  if (dateA && dateB) {
    return new Date(dateB).getTime() - new Date(dateA).getTime();
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

console.log(`[build-content] Successfully aggregated and normalized:
- ${events.length} events -> events.json
- ${activities.length} activities -> activities.json
- ${gallery.length} gallery items -> gallery.json`);
