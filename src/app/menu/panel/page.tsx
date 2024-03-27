import React from 'react';
import Banner from '../../../components/banner';
import MiniDrawer from '../../../components/barraLateral';

export default function Dashboard() {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <MiniDrawer />
      </div>
    );
}