// <!-- <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Enora Lifestyle and Spa</title>
// 	<link rel="preconnect" href="https://fonts.googleapis.com">
// 	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// 	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
// 	<style>
// 		* {
// 			margin: 0;
// 			padding: 0;
// 			box-sizing: border-box;
// 			font-family: "Playfair Display", serif;
// 			font-optical-sizing: auto;
// 			font-style: normal;
// 		}
// 		@media (min-width: 200px) and (max-width: 767px) {
// 			h3 {
// 				font-size: 3rem;
// 			}
// 		}
// 	</style>
//   </head>
//   <body>
// 	<div style="background: #901e7619; width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; text-align: center;">
// 		<p style="color: #901e76; font-size: 1rem;">Enora Lifestyle and Spa</p>
// 		<h3 style="font-size: 5rem;">Coming Soon</h3>
// 	</div>
//   </body>
// </html> -->

import React from 'react';

const ComingSoonPage: React.FC = () => {
  return (
    <div 
      className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden text-center"
      style={{ 
        backgroundColor: '#901e7619',
        fontFamily: '"Playfair Display", serif',
      }}
    >
      <p 
        className="text-base" 
        style={{ color: '#901e76' }}
      >
        Enora Lifestyle and Spa
      </p>
      <h3 
        className="text-[3rem] sm:text-[5rem] font-normal leading-tight"
      >
        Coming Soon
      </h3>
    </div>
  );
};

export default ComingSoonPage;