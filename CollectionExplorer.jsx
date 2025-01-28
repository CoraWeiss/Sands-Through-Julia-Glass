import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Filter, Calendar, Grid, Info } from 'lucide-react';

const CollectionExplorer = () => {
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [types, setTypes] = useState(['All']);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
        const result = Papa.parse(response, {
          header: true,
          skipEmptyLines: true
        });
        
        const uniqueTypes = ['All', ...new Set(result.data.map(item => item.Type))];
        setTypes(uniqueTypes);
        setItems(result.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const filteredItems = selectedType === 'All' 
    ? items 
    : items.filter(item => item.Type === selectedType);

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
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedItem(item)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{item.Title}</CardTitle>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  {item.Date}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Grid className="w-4 h-4" />
                  {item.Type}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {item.Medium !== 'Not specified' && (
                    <p className="italic">{item.Medium}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedItem.Title}</h2>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
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
                      className="text-blue-600 hover:underline"
                    >
                      View in Collection →
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
