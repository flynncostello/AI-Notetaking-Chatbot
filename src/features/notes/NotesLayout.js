import React from 'react';
import { Outlet } from 'react-router-dom';
import Notes from "./Notes";

const NotesLayout = () => (
  <div>
    <Notes />
  </div>
);

export default NotesLayout;