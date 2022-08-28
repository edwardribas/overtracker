import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './routes';
import './assets/styles/index.module.scss';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <Router/>
);