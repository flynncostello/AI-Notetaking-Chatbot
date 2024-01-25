import React from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import ROUTES from "./routes";
import './AppLayout.css';
import logo from '../images/logo.png';


export default function AppLayout() {
    const location = useLocation();

    return (
        <div className="website-container">
            <div className="nav-container">
                <Link to={ROUTES.root()}>
                    <img className="logo" src={logo} alt="logo"/>
                </Link>
                <nav>
                    <ul className="main-nav-ul">
                        <li>
                            <NavLink to={ROUTES.notesRoute()} className="main-nav-link">Notes</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.conversationsRoute()} className="main-nav-link">Conversations</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {location.pathname === ROUTES.root() && (
                <div className="home">
                    <div className="main-text">
                        <h1>Chatbot For Learning</h1>
                        <h2>Discuss concepts, terminology, questions, and more with our custom AI. Once you're done, save your conversation and watch our AI automatically summarise and store the information discussed</h2>
                        <Link to={ROUTES.newConversationRoute()} className="start-new-conversation-button">Start New Conversation</Link>
                    </div>
                    <div>
                        {/* <img className="home-image" src={homeImage} alt="home"/> */}
                    </div>
                </div>
            )}
            <Outlet/>
        </div>
    );
}
