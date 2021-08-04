/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { IoNotificationsOutline } from "react-icons/io5";
/* eslint-disable */

export default function BellIcon() {
  return (
    
    <li
      css={css`
        &:hover {
          color: #17b298;
          text-decoration: none;
        }

        & > a {
          margin: 12px 0;
          height: 78px;
          border-bottom: medium none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: inherit;
         

          span {
            font-size: 13px;
            margin-left: px;
            font-family: "Nunito", sans-serif;
            ${'' /* margin-left: 41px; */}
          }

          svg {
            display: block;
            font-size: 36px;
            margin-bottom: 6px;
            ${'' /* margin-left: 39px */}
          }
        }
      `}
    >
      <a>
        <IoNotificationsOutline />
        <span 
        >Notifications</span>
      </a>
    </li>
  );
}
