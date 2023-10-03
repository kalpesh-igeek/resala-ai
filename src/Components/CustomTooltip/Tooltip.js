import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// TO USE THIS MAKE SURE ID NEED TO SAME FOR TOOLTIP AND ON HOVER ELEMENT ID
const CustomTooltip = ({ children, id, content, maxWidth, place }) => {
  // console.log("here inside ", children, id, content, maxWidth, place);
  return (
    <>
      <div className="">{children}</div>
      <ReactTooltip
        border="1px solid #1678F2"
        opacity={1}
        style={{
          background: 'white',
          zIndex: '1111',
          color: '#19224C',
          boxShadow: '0px 10px 100px rgba(60, 66, 87, 0.2)',
          borderRadius: '8px',
          maxWidth: maxWidth ? maxWidth : '100%',
          fontSize: '12px',
          lineHeight: '18px',
          padding: '8px',
          fontWeight: '400',
        }}
        classNameArrow={`custom-arrow-${place}`}
        anchorId={id}
        place={place}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ReactTooltip>
    </>
  );
};

export default CustomTooltip;
