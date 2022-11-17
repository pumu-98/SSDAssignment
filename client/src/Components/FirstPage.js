import { Button } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';

import home from '../img/home.gif';

const FirstPage = ()=>(
   <div >
     
   <div style={{ marginLeft: '300px'}}>
     

      <div class="row">
        <div class="column"> <img src={home} alt="BigCo Inc. logo" style={{ width: '600px', height:'450px', marginLeft: '-300px'}} /></div>
        <div class="column"><h2 style={{ fontSize: 36, marginTop: '100px' }}>To - Do Application</h2>


        <Button variant="primary" type="submit"  style={{ color: 'red', marginTop: '50px'}}>
        <Link to="/adminlogin" style={{ color: 'white', background: '#404040', padding: '15px', borderRadius: '5px', width: '200px', height: '50px'}}> 
                       Admin       
        </Link>
      </Button>

      <Button variant="primary" type="submit"  style={{ color: 'red',  marginTop: '50px'}}>
        <Link to="/login" style={{ color: 'white', background: '#404040', padding: '15px', borderRadius: '5px', width: '200px', height: '50px'}}> 
            Worker / Manager    
        </Link>
      </Button></div>
        </div>
      </div>
</div>
)

export default FirstPage;