import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Menu } from 'antd';
import { Spin, Alert } from 'antd';
import Content from './Content/Content'
import './MainContentMenu.scss';

function MainContentMenu() {
    const [current, setCurrent] = useState('clans');
    const [contentArr, setContentArr] =  useState(null);
    const [processing, setProcessing] =  useState(false);
    const [contId, setContId] =  useState(null);

    let { path, url } = useRouteMatch();

    useEffect(() => {
      let selectedCurrent = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
      // console.log(selectedCurrent);
      setCurrent(selectedCurrent)
      getContent(selectedCurrent)
   
    }, [])

    const getContent = selItem => {
      let contents = [];
      axios.post('/api/getcontent', { contentId: selItem })
            .then(res =>{
              setProcessing(false) // Processing Off
                if(res.data){
                  res.data.items.forEach(function (content) {
                      contents.push(content);
                  })
                  contents.sort(function(a, b) {
                      return a.fields.title.localeCompare(b.fields.title)
                  });
                  setContentArr(contents);
                  setContId(selItem);
                } else {
                  setContentArr(null);
                  setContId(null);
                }
                // console.log(res)
                // setFiltredContent(res.data.items)
            })
    };

    const handleClick = e => {
      setProcessing(true) // Processing On
      setCurrent(e.key) // Set state
      getContent(e.key)
 
      // console.log('click ', e);
    }
    
    return (
      <main className='MainContentMenu'>
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
            <Menu.Item key="clans">
                <Link to={`${url}/clans`}>Clans & Bloodlines</Link>
            </Menu.Item>
            <Menu.Item key="discipline">
                <Link to={`${url}/discipline`}>Disciplines</Link>
            </Menu.Item>
            <Menu.Item key="techniques">
                <Link to={`${url}/techniques`}>Techniques</Link>
            </Menu.Item>
            <Menu.Item key="skills">
                <Link to={`${url}/skills`}>Skills</Link>  
            </Menu.Item>
            <Menu.Item key="merits">
                <Link to={`${url}/merits`}>Merits/Flaws</Link>
            </Menu.Item>
            <Menu.Item key="attributes">
                <Link to={`${url}/attributes`}>Attributes</Link>
            </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path={path}>
            <h3><center>Please select a topic.</center></h3>
          </Route>
          <Route path={`${path}/:contentId`}>
            {
              !processing ? 
                <Content contentArr={contentArr} contId={contId} /> 
                          :
                <Spin tip="Diagram Opening..." size="large">
                  <Alert
                    message={`- - -`}
                    description="Loading ..."
                    type="info"
                  />
                </Spin>
            }
          </Route>
        </Switch>
      </main>
    )
}

export default MainContentMenu
