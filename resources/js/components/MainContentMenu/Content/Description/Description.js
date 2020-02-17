import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;
import './Description.scss';

function Description({ selectedEntry, entryName }) {
    // console.log(selectedEntry[entryName]) // => Selected Entry Info Data
    let ContentType = window.location.href.slice(window.location.href.lastIndexOf('/') + 1)
    ContentType = ContentType.charAt(0).toUpperCase() + ContentType.substring(1)
    useEffect(() => {
        // console.log(ContentType)
        // console.log(selectedEntry)
    })

    return (
        <div className="description-content">
                <p><Text code>{ContentType}:</Text> <span>{selectedEntry[entryName].fields.title}</span></p>
            {
                selectedEntry[entryName].fields.power && !selectedEntry[entryName].fields.parent && 
                <p><Text code>Power:</Text> <span>{selectedEntry[entryName].fields.power}</span></p>
            }
            {
                selectedEntry[entryName].fields.level > 0 && 
                <p><Text code>Level:</Text> <span>{selectedEntry[entryName].fields.level}</span></p>
            }
            {
                selectedEntry[entryName].fields.focusDescriptor && 
                <p><Text code>Description:</Text> <span>{selectedEntry[entryName].fields.focusDescriptor.content[0].content[0].value}</span></p>
            }
            {   
                selectedEntry[entryName].fields.summary && 
                <p><Text code>Summary:</Text> <span>{selectedEntry[entryName].fields.summary.content[0].content[0].value}</span></p>
            }
        </div>
    )
};

export default Description;
