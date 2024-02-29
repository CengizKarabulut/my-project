import React from 'react';

function WasteContainer({ id, level, location, onEmpty }) {
  const handleEmptyClick = () => {
    onEmpty(id);
  };

  return (
    <div className="konteyner">
      <h2>Konteyner ID: {id}</h2>
      <p>Yer: {location}</p>
      <p>Doluluk Seviyesi: {level}%</p>
      <button onClick={handleEmptyClick}>Konteyneri Boşalt</button>
    </div>
  );
}

export default WasteContainer;