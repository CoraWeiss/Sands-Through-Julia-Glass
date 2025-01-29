import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Filter, Calendar, Grid, Info, Image as ImageIcon } from 'lucide-react';

// Met Museum API endpoint
const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

// Function to convert Met image URL to thumbnail size
const getMetThumbnail = (imageUrl) => {
  if (!imageUrl) return null;
  // Met Museum URLs typically end with '/full/full/0/default.jpg'
  // We can modify this to get a smaller version
  return imageUrl.replace('/full/full/0/default.jpg', '/full/200,/0/default.jpg');
};

const CollectionExplorer = () => {
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [types, setTypes] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('paste.txt');
        const text = await response.text();
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: true
        });
        
        // Fetch Met Museum images for items with Met URLs
        const itemsWithImages = await Promise.all(
          result.data.map(async (item) => {
            if (item.URL && item.URL.includes('metmuseum.org')) {
              const objectId = item.URL.split('/search/')[1];
              try {
                const metResponse = await fetch(`${MET_API_BASE}${objectId}`);
                const metData = await metResponse.json();
                const imageUrl = metData.primaryImage;
                return {
                  ...item,
                  imageUrl,
                  thumbnailUrl: getMetThumbnail(imageUrl),
                  hasImage: Boolean(imageUrl)
                };
              } catch (error) {
                console.error(`Error fetching Met data for ${objectId}:`, error);
                return { ...item, hasImage: false };
              }
            }
            return { ...item, hasImage: false };
          })
        );

        const uniqueTypes = ['All', ...new Set(itemsWithImages.map(item => item.Type))];
        setTypes(uniqueTypes);
        setItems(itemsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredItems = selectedType === 'All' 
    ? items 
    : items.filter(item => item.Type === selectedType);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Historical Collection Explorer</h1>
        
        {/* Type Filter */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5" />
          <div className="flex gap-2 flex-wrap">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <div 
              key={index}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white flex flex-col"
              onClick={() => setSelectedItem(item)}
            >
              <div className="p-4 flex gap-4">
                {item.hasImage && item.thumbnailUrl && (
                  <div className="flex-shrink-0">
                    <img 
                      src={item.thumbnailUrl}
                      alt={item.Title}
                      className="w-20 h-20 object-cover rounded bg-gray-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/80?text=NA';
                      }}
                    />
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-semibold truncate">{item.Title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.Date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Grid className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.Type}</span>
                  </div>
                  {item.Medium !== 'Not specified' && (
                    <p className="mt-1 text-sm italic text-gray-600 truncate">{item.Medium}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedItem.Title}</h2>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {selectedItem.hasImage && selectedItem.imageUrl && (
                <div className="mb-6">
                  <img 
                    src={selectedItem.imageUrl}
                    alt={selectedItem.Title}
                    className="w-full max-h-96 object-contain bg-gray-100 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span>{selectedItem.Date}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-gray-600" />
                  <span>{selectedItem.Type}</span>
                </div>

                {selectedItem.Medium !== 'Not specified' && (
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-gray-600" />
                    <span>{selectedItem.Medium}</span>
                  </div>
                )}

                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-gray-600">{selectedItem.Location}</p>
                </div>

                {selectedItem.URL && (
                  <div className="pt-2">
                    <a 
                      href={selectedItem.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-2"
                    >
                      View in Collection <ImageIcon className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionExplorer;
