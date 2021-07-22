
import * as React from "react";
import { css } from "@emotion/css"
import { ElementHelmet } from "../components/elementHelmet";
export default function Notfound() {
  return (
    <>
      <ElementHelmet t={`404`} d="Page not found !"></ElementHelmet>
      <div class="notfound">
        <div className={css`font-size: 100px;display: flex;align-items: center;flex-direction: column;`}>
          <div>404</div>
          <div className="textnotfound">The page you're looking for couldn't be found. It's possible that the page has been deleted or is currently under construction. If you're sure there should be a page here, please contact us.</div>
        </div>
        <img src="https://cdn.glitch.com/190d8bdf-8b1a-43fc-994d-fab0bd173689%2F749045743976710154.gif?v=1623663819593" />
      </div>
    </>
  );
}
