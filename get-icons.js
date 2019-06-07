// Some themed icons .svg's aren't available in the github repo and can only
// be donwloaded from https://material.io/tools/icons
// This script automates the download
const fs = require('fs')
const https = require('https')
const path = require('path')


// Where to save downloaded icons
const DEST_FOLDER = path.resolve(__dirname, 'src', 'icons')
if (!fs.existsSync(DEST_FOLDER)){
  fs.mkdirSync(DEST_FOLDER);
}

// List icons you want to get in ['icon_name', 'style'] format
const ICONS_TO_GET = [
  ['account_circle', 'baseline'],
  ['add', 'baseline'],
  ['add_circle', 'baseline'],
  ['arrow_back', 'baseline'],
  ['arrow_downward', 'baseline'],
  ['arrow_left', 'baseline'],
  ['arrow_right', 'baseline'],
  ['arrow_upward', 'baseline'],
  ['assessment', 'outline'],
  ['assignment', 'outline'],
  ['attach_file', 'baseline'],
  ['check_circle', 'baseline'],
  ['check_circle', 'outline'],
  ['close', 'baseline'],
  ['cloud_upload', 'baseline'],
  ['delete', 'baseline'],
  ['edit', 'baseline'],
  ['email', 'baseline'],
  ['error_outline', 'baseline'],
  ['expand_less', 'baseline'],
  ['expand_more', 'baseline'],
  ['filter_list', 'baseline'],
  ['group', 'outline'],
  ['help', 'baseline'],
  ['help_outline', 'baseline'],
  ['history', 'baseline'],
  ['info', 'baseline'],
  ['insert_chart', 'baseline'],
  ['lock', 'baseline'],
  ['menu', 'baseline'],
  ['new_releases', 'outline'],
  ['phone', 'baseline'],
  ['query_builder', 'baseline'],
  ['receipt', 'outline'],
  ['remove_red_eye', 'baseline'],
  ['save_alt', 'baseline'],
  ['search', 'baseline'],
  ['send', 'baseline'],
  ['stars', 'outline'],
  ['today', 'baseline'],
  ['work_outline', 'baseline'],
  ['exit_to_app', 'baseline'],
  ['settings', 'baseline'],
]

// Get svg download link
let iconUrl = (icon, style='baseline') =>
  `https://material.io/tools/icons/static/icons/${style}-${icon}-24px.svg`

// Path to save to save
let iconFilePath = (icon, style='baseline') =>
  path.resolve(
    DEST_FOLDER,
    style === 'baseline' ? `${icon}.svg` : `${icon}_${style}.svg`
  )

// Download (thanks https://stackoverflow.com/a/22907134/723891)
let download = function(url, dest, cb) {
  let file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

// Download each icon (if it wasn't already)
ICONS_TO_GET.forEach(([icon, style]) => {
  let path = iconFilePath(icon, style)
  if (!fs.existsSync(path)) {
    download(iconUrl(icon, style), path)
  }
})
