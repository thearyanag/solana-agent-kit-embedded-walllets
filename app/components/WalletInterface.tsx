'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth';
import { useState } from 'react';
import { getAgent } from '../agent';

export default function WalletInterface() {
  const { login, authenticated, user, logout } = usePrivy();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const { wallets } = useSolanaWallets();
  
  if (!authenticated) {
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={login}
          className="rounded-full bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition-colors"
        >
          Login with Privy
        </button>
      </div>
    );
  }

  const agent = wallets.length > 0 ? getAgent(wallets[0]) : null;
  
  const handleSendMessage = async () => {
    if (message.trim() && agent) {
      setChatMessages([...chatMessages, message]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm font-mono">
          Wallet: {wallets[0]?.address?.slice(0, 6)}...{wallets[0]?.address?.slice(-4)}
        </div>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>

      <div className="w-full border rounded-lg p-4 h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-3 py-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 