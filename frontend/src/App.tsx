import React from 'react';
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from './components/navigation/Header';

const App = () => {
  return (
    <>
      <Header />
      <div className='flex bg-slate-600'>
        <Outlet />
      </div>
    </>
  );
}

export default connect()(App);