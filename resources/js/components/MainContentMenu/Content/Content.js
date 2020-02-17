import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Spin, Alert } from 'antd';
import Empty from '../../Helper/Empty';
import Description from './Description/Description';
import axios from 'axios';
import './Content.scss';

import { Tree, Icon } from 'antd';

const { TreeNode } = Tree;

function Content({ contentArr, contId }) {
    // console.log(contentArr)
    // console.log('contentArr')
    const [hasInfo, setHasInfo] =  useState(false);
    const [getEntries, setGetEntries] = useState(null);
    const [selctedEntruName, setSelctedEntruName] =  useState(null);
    const [selectedEntry, setSelectedEntry] =  useState(null);
    const [bollSelected, setBollSelected] =  useState(false);
    
    
    // let { contentId } = useParams();
    
    useEffect(() => {}, []);

    const onSelect = (selectedKeys, info) => {
        setBollSelected(info.selected)
        setHasInfo(false)
        // console.log(selectedKeys, info.node.props.loadedKeys);
        //setBollSelected(info.selected) //  true || false
        let entry_name = info.node.props.title;
        let entry_id = info.node.props.loadedKeys;
        
        info.selected ? // If selected
            axios.post('/api/getEntriesInfo', { entry_id: entry_id })
                .then(res =>{
                    setHasInfo(true)
                    if(res.data){
                            setSelectedEntry({ [entry_name]: res.data });
                            setSelctedEntruName(entry_name);
                    }
                    else{
                        setSelectedEntry(null)
                        console.log('No Data');
                    }
                })
            :
            setSelectedEntry(null);


            // setBollSelected(info.selected)
      };
    //   console.log(selectedEntry);
    //   console.log('selectedEntry');
    const onClick = (expandedKeys, {expanded: bool, node}) => {
        // console.log(contId);
        let entry = node.props.title
        // console.log(expandedKeys, bool, node.props.title);
        // console.log(contId);
        bool ? // If expected
            axios.post('/api/getEntries', { entry: entry, contentId: contId })
                .then(res =>{
                    if(res.data){
                        // console.log(res.data.items);
                        res.data.items.sort(function(a, b) {
                            return a.fields.title.localeCompare(b.fields.title)
                        });
                        res.data.items = res.data.items.filter(function(item) {
                            return item.fields.title !== item.fields.power
                        });
                        // console.log(res.data.items);
                        setGetEntries({...getEntries ,[entry]: res.data.items})
                    }
                    else{
                        // setGetEntries(null)
                    }
                })
            :
            // setGetEntries(null)
            console.log('close')
    }

    return (
        <div className="Content-info-bar">
            {
                contentArr !== null ? 
                    
                    <div className="Info-bar">
                        <Tree
                            showLine={true}
                            className="Tree-ant Left-bar-items"
                            onSelect={onSelect}
                            onExpand={onClick}
                        >
                            {
                                contentArr.map((item, index) => {
                                    // console.log(item);
                                    return (
                                        <TreeNode 
                                            icon={<Icon type="carry-out" />} 
                                            title={item.fields.title} // Entry Name
                                            key={'0-0-' + index}      // [0-0-1] [0-0-2] etc.
                                            loadedKeys={item.sys.id}  // Entry ID
                                            >
                                                {
                                                    getEntries && getEntries[item.fields.title] ? 
                                                        getEntries[item.fields.title].map((entry, ind) => {
                                                            return (
                                                                <TreeNode 
                                                                    title={entry.fields.title}  // Entry Name
                                                                    key={`0-0-${index}-${ind}`} // [0-0-1-1] [0-0-1-2] etc.
                                                                    loadedKeys={entry.sys.id}   // Entry ID
                                                                > 
                                                                </TreeNode>
                                                            )
                                                        })
                                                                :
                                                        <TreeNode title={ <Spin /> } ></TreeNode> // Processing
                                                }               
                                        </TreeNode>
                                    )
                                })
                            }
                        </Tree>
                        { 
                            bollSelected ?
                                (hasInfo && selectedEntry && selectedEntry[selctedEntruName]) //ets. true => true => [Beckoning: {object}] 
                                            ?
                                        <Description selectedEntry={selectedEntry} entryName={selctedEntruName} /> 
                                            :
                                        <div className="Information-processing">
                                            <Spin tip="Loading..." size="large">
                                                {/* <Alert
                                                message="Alert message title"
                                                description="Further details about the context of this alert."
                                                type="info"
                                                /> */}
                                            </Spin>
                                        </div>
                                        :
                            null
                        }
                    </div>    
                :
                <Empty/> // No Data 
            }
        </div>
    )
}

export default Content