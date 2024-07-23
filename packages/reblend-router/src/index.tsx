import Reblend from 'reblendjs';
import './__test__/index.css';
import reportWebVitals from './__test__/reportWebVitals';
import Routing from './__test__/Routing';

Reblend.mountOn('root', Routing);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CREBA-vitals
reportWebVitals();
