const fs = require('fs');
const files = ['index.html', 'hosting.html', 'services.html', 'pricing.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace the Tailwind CDN script line with our static stylesheet link
    content = content.replace(
        /<script\s+src="https:\/\/cdn\.tailwindcss\.com.*?"\s*><\/script>/is,
        '<link rel="stylesheet" href="style.css" />'
    );

    // 2. Remove the inline tailwind.config script block
    content = content.replace(
        /<script>\s*tailwind\.config\s*=\s*\{[\s\S]*?\}\s*<\/script>/is,
        ''
    );

    // 3. Remove the customized <style type="text/tailwindcss"> block completely (from index, hosting, services)
    content = content.replace(
        /<style type="text\/tailwindcss">[\s\S]*?<\/style>/is,
        ''
    );

    // 4. Remove the <style> block from pricing.html (it begins with /* Theme Setup */)
    content = content.replace(
        /<style>[\s\S]*?\/\* Theme Setup \*\/[\s\S]*?<\/style>/is,
        ''
    );

    // Also clean up any extra blank lines left over using regex
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    fs.writeFileSync(file, content);
});
console.log('Successfully updated HTML files to reference static style.css and removed inline CDN scripts.');
