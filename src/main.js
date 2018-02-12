import React from 'react';
import ReactDom from 'react-dom';
import PCIndex from './pc_index';
import MobileIndex from "./mobile_index";
import MediaQuery from 'react-responsive';

class Main extends React.Component{
    render(){
        return(
            <div>
                <MediaQuery query="(min-device-width:1224px)">
                    <PCIndex />
                </MediaQuery>
                  
                <MediaQuery query="(max-device-width: 1224px)">
                    <MobileIndex />
                </MediaQuery>
            </div>
        )
    }
}

ReactDom.render(
    <Main />,
    document.getElementById('root')
)