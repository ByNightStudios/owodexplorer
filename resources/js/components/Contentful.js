import React, { useState, useEffect } from 'react';
import { Spin, Alert } from 'antd';

import Tree from './Tree';
import axios from 'axios';


function Contentful() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        let contents = [];
        let globalArr = [];
        let parent = [];
        let fields = [];
        axios.post('/api/contentful')
            .then(res => {
                console.log(globalArr)
                res.data.items.forEach(function (entry) {
                    if( entry.fields.parent == true ) {
                      parent.push(entry.fields.power )
                    }
            
                    if( !contents.includes( entry.sys.contentType.sys.id )) {
                      contents.push( entry.sys.contentType.sys.id )
                    }
                })

                parent.forEach( item => {
                    var arr = res.data.items.filter( entry => {
                        return entry.fields.power == item 
                    });
                    fields.push({ [item] : arr})
                });

                contents.forEach( item => {
                    globalArr.push({ [item] : fields})
                });
                setContent(globalArr)
            })
            .catch(err => console.log(err));
        }, []);


    return (
        <div>
            {
                ( content.length && content.length > 0 ) 
                ?   <Tree content={content} />
                :   <Spin tip="Diagram Opening...">
                        <Alert
                        message={`_ _ _`}
                        description="Diagram Opening ..."
                        type="info"
                        />
                    </Spin>
            }
        </div>
    )
}

export default Contentful
