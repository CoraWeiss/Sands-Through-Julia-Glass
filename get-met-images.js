import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const metObjects = [
  {id: "14521", title: "Beauty Revealed"},
  {id: "15597", title: "Armchair"},
  {id: "15196", title: "Portrait of a Lady (miniature)"},
  {id: "18830", title: "Portrait of a Lady (miniature)"},
  {id: "6875", title: "Rocking Chair"},
  {id: "14472", title: "The Contest for the Bouquet"},
  {id: "16580", title: "Art Students"},
  {id: "224", title: "Reclining Armchair"},
  {id: "11083", title: "View of Poestenkill New York"},
  {id: "13223", title: "Cremorne Gardens No. 2"},
  {id: "12187", title: "Night"},
  {id: "10443", title: "Bull's Head Tavern"},
  {id: "12155", title: "The Nurture of Bacchus"},
  {id: "12128", title: "A Male Model Standing before a Stove"},
  {id: "229", title: "Folding Armchair"},
  {id: "10393", title: "Lydia Crocheting in the Garden at Marly"},
  {id: "10822", title: "The Pathetic Song"},
  {id: "13647", title: "Quilt Top, Crazy pattern"},
  {id: "10811", title: "The Artist's Wife and His Setter Dog"},
  {id: "13211", title: "Arrangement in Flesh Colour and Black"},
  {id: "10391", title: "Lady at the Tea Table"},
  {id: "19781", title: "Chandelier"},
  {id: "19777", title: "Dressing glass"},
  {id: "10424", title: "Woman on a Bench"}
];

async function getMetObjectImages() {
  const results = [];
  
  for (const obj of metObjects) {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${obj.id}`);
      const data = await response.json();
      
      if (data.primaryImage) {
        results.push({
          id: obj.id,
          title: obj.title,
          imageUrl: data.primaryImage,
          additionalImages: data.additionalImages
        });
        console.log(`Found image for: ${obj.title}`);
      } else {
        console.log(`No image available for: ${obj.title}`);
      }
    } catch (error) {
      console.error(`Error fetching object ${obj.id}:`, error);
    }
  }

  // Save results to a file
  await writeFile(
    'met-images.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\nImage URLs have been saved to met-images.json');
  console.log('\nTo download, visit each URL in a browser or use wget/curl commands:');
  results.forEach(item => {
    if (item.imageUrl) {
      console.log(`\nwget "${item.imageUrl}" -O "${item.title.replace(/[^a-z0-9]/gi, '_')}.jpg"`);
    }
  });
}

getMetObjectImages();
