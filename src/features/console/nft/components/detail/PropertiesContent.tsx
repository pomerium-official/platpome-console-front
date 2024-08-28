import React from 'react';
import Properties, { PropertyType } from '../create-NFT/Properties';
interface PropertiesContentProps {
  properties?: PropertyType[];
}
const PropertiesContent = ({ properties }: PropertiesContentProps) => {
  return (
    <div className="propertiesContent">
      <h2 className="sectionTitle">Properties</h2>
      <Properties properties={properties} />
    </div>
  );
};

export default PropertiesContent;
