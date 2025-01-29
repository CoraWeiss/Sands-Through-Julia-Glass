import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Search, Filter, Calendar } from 'lucide-react';
import UploadPhoto from './UploadPhoto';

const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

const getMetThumbnail = (imageUrl) => {
  if (!imageUrl) return null;
  return imageUrl.replace('/full/full/0/default.jpg', '/full/150,/0/default.jpg');
};

const CollectionExplorer = () => {
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [types, setTypes] = useState(['All']);
  const [loading, setLoading] = useState(true);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [newItem, ...prevItems]);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('paste.txt');
        const text = await response.text();
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: true
        });
        
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

  const filteredItems = items
    .filter(item => selectedType === 'All' || item.Type === selectedType)
    .filter(item => 
      searchTerm === '' || 
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 9); // Only show first 9 items

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">1880s Historical Collection</h1>
        
        {/* Upload Component */}
        <UploadPhoto onAddItem={handleAddItem} />
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search the collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedType === type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2">
          {filteredItems.map((item, index) => (
            <a
              key={index}
              href={item.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              {item.hasImage && item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.Title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xs font-medium line-clamp-2">{item.Title}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-2 h-2" />
                    <span className="text-[10px]">{item.Date}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mt-6 text-gray-600">
          Showing {filteredItems.length} of {items.length} items
        </div>
      </div>
    </div>
  );
};

export default CollectionExplorer;
