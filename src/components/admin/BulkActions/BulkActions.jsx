import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function BulkActions({ selectedItems, onClear, onRefresh }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkAction = async (action) => {
    if (selectedItems.length === 0) {
      toast.error('No items selected');
      return;
    }
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${selectedItems.length} items ${action} successfully`);
      onClear();
      onRefresh();
    } catch (error) {
      toast.error(`Failed to ${action} items`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-4 flex items-center gap-4 z-50">
      <span className="text-sm font-medium text-gray-700">{selectedItems.length} items selected</span>
      <button onClick={() => handleBulkAction('enabled')} disabled={isProcessing} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">Enable</button>
      <button onClick={() => handleBulkAction('disabled')} disabled={isProcessing} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">Disable</button>
      <button onClick={() => handleBulkAction('deleted')} disabled={isProcessing} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Delete</button>
      <button onClick={onClear} className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">Clear</button>
    </div>
  );
}
