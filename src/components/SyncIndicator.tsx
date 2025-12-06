'use client';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useEffect, useState } from 'react';

export default function SyncIndicator() {
  const { status, syncToServer, lastUpdated } = useBudgetStore();
  const [isOnline, setIsOnline] = useState(true);
  
  // FIX: New state to track if we are on the client
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // We are now on the client!
    setHasMounted(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      console.log("Back online! Attempting sync...");
      syncToServer();
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncToServer]);


  const getStatusDisplay = () => {
    if (!isOnline) return { text: 'Offline', color: 'bg-gray-500', icon: '📡' };
    
    switch (status) {
      case 'synced':
        return { text: 'Saved', color: 'bg-green-500', icon: '✔' };
      case 'sync-pending':
        return { text: 'Syncing...', color: 'bg-yellow-500', icon: '⏳' };
      case 'local-only':
        return { text: 'Unsaved', color: 'bg-yellow-500', icon: '💾' };
      default:
        return { text: 'Unknown', color: 'bg-gray-500', icon: '?' };
    }
  };

  const display = getStatusDisplay();

  if (!hasMounted) {
    return null; 
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400">
        Last update: {new Date(lastUpdated).toLocaleTimeString()}
      </span>
      
      <button
        onClick={() => syncToServer()}
        disabled={status === 'synced' || !isOnline}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium text-sm transition-all
          ${display.color} 
          ${status === 'sync-pending' ? 'animate-pulse' : ''}
        `}
      >
        <span>{display.icon}</span>
        <span>{display.text}</span>
      </button>
    </div>
  );
}