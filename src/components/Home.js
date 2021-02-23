import React from 'react';
import  NavigationBar  from './NavigationBar/NavigationBar';
import './Home.css';
import Footer from './Footer'
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div className='wrapper'>
            <div className="navigation">
                <NavigationBar />
            </div>

            <div className='main'>
                <Link to='/new-recipe'>Create a recipe</Link><br/>
                <Link to='/profile'>Profile</Link>
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}