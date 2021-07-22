import React, { useState, useEffect } from "react";
import PageRouter from "./components/router.jsx";
import { ProvideAuth } from "./hooks/use-auth.jsx";
export default function Home() {
  return (
    <ProvideAuth>
      <div class="body">
        <PageRouter />
      </div>
    </ProvideAuth>
 
    
  );
}