import React from 'react';
import { Helmet } from 'react-helmet-async';
export const ElementHelmet = ((props) => {
const description = props.d ? props.d : "css.surf create and find element to build your website for free !"
const title = `${props.t ? `${props.t}  • css.surf` : "css.surf"}`
const color = props.c ? props.c : "#00c4ff"
const logo = "https://cdn.glitch.com/190d8bdf-8b1a-43fc-994d-fab0bd173689%2Fwater-wave.png?v=1625404392478"
  return (
    <>
        <Helmet>
            <link rel="shortcut icon" href={logo}></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" data-rh="true"></link>
            <script type="module" src="/src/index.jsx"></script>
            <script src="https://kit.fontawesome.com/54c3c6b2ad.js" crossorigin="anonymous" data-rh="true"></script>
            <title>{title}</title>
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charset="UTF-8" />
            <meta name="keywords" content="css,surf,element" />
            <meta name="theme-color" content={color} />
            <meta name="description" content="" />
            <meta property="og:site_name" content="css.surf"/>
            <meta property="og:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta data-react-helmet="true" property="og:description" content={description} />
            <meta itemprop="name" content={title} />
            <meta itemprop="description" content={description} />
            <meta itemprop="image" content={logo} />
            <meta property="og:image" content={logo} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://css.surf" />
        </Helmet>
    </>
  );
})