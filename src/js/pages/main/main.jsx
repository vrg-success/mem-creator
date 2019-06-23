import React from 'react';
import { Link } from 'react-router-dom';

import './main.sass';


export const Main = () => (
  <section className="main">
    <Link to="/create">Создать мем</Link>
  </section>
);