import React from 'react';
import home from '../img/home.gif';

const Home = ()=>(
   <div>
        <div class="row">
        <div class="column"> <img src={home} alt="BigCo Inc. logo" style={{ width: '600px', height:'450px', marginTop: '40px' }} /></div>
        <div class="column"><h2 style={{marginTop: '200px', fontSize: 46 }}>To - Do Application</h2></div>
        </div>
</div>
)

export default Home;