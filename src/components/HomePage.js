import React from 'react';
import HomeComponent from './HomeComponent';

export default function HomePage({ allData, remove_allData }) {
  return (
    <div>
      <HomeComponent allData={allData} remove_allData={remove_allData} />
    </div>
  );
}
