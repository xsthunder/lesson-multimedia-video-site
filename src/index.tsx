import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'
const ele = document.getElementById('app');
ReactDom.render(<App></App>,ele)
console.log('hello hot');