import React from 'react';
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from './components/navigation/Header';

const App = () => {
  return (
    <div className='w-full h-full	text-slate-100'>
      <Header />
      <div className='w-full h-full bg-slate-800 flex flex-col justify-center items-center'>
        <Outlet />
      </div>
    </div>
  );
}

export default connect()(App);