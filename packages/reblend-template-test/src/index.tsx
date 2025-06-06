import Reblend from 'reblendjs';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Reblend.mountOn('root', App, {
    preloaderDeferTimeout: 5000,
    lazyComponentDeferTimeout: 1000,
    placeholderDeferTimeout: 1000
    //noDefering: true
});
