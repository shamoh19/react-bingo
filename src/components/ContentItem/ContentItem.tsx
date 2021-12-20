import React from 'react';

import { MDBCol } from "mdbreact";

const ContentItem: React.FC<{ id: any, children: any, onToggle: any, isSet: any }> = ({ id, children, onToggle, isSet }) => {
  return (
    <MDBCol onClick={onToggle} sg="3" className={`tile ${isSet ? "tile--set" : ""} article__content`}>
      {children}
    </MDBCol >
  );
}

export default ContentItem;
