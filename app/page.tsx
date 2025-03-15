
import dynamic from 'next/dynamic';
import WalletInterface from './components/WalletInterface';
export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <WalletInterface />
    </div>
  );
}
