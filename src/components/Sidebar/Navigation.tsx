/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import style from '../../scss/catalog.module.scss';

export const Navigation = () => {
  return (
    <div className={style.navbar}>
      <ul>
        <li className={style.hover_left_line}>
          <a href="#">
            <span className={`${style.tooltip_document} ${style.tooltip}`}>Каталог</span>
            <svg width="24" height="24" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={style.hover__img}
                d="M12.9656 14.4736H5.7456M12.9656 10.2871H5.7456M8.5007 6.1103H5.7457M13.158 1C13.158 1 5.481 1.004 5.469 1.004C2.709 1.021 1 2.837 1 5.607V14.803C1 17.587 2.722 19.41 5.506 19.41C5.506 19.41 13.182 19.407 13.195 19.407C15.955 19.39 17.665 17.573 17.665 14.803V5.607C17.665 2.823 15.942 1 13.158 1Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
        <li className={style.hover_left_line}>
          <a href="company.html">
            <span className={`${style.tooltip_work} ${style.tooltip}`}>Мои кампании</span>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={style.hover__img}
                d="M0.8042 13.477C0.8042 13.477 0.9462 15.215 0.9792 15.763C1.0232 16.498 1.3072 17.319 1.7812 17.889C2.4502 18.697 3.2382 18.982 4.2902 18.984C5.5272 18.986 14.5222 18.986 15.7592 18.984C16.8112 18.982 17.5992 18.697 18.2682 17.889C18.7422 17.319 19.0262 16.498 19.0712 15.763C19.1032 15.215 19.2452 13.477 19.2452 13.477M6.4961 3.32949V2.95849C6.4961 1.73849 7.4841 0.750488 8.7041 0.750488H11.2861C12.5051 0.750488 13.4941 1.73849 13.4941 2.95849L13.4951 3.32949M9.9951 14.6782V13.3842M0.75 6.38909V9.85609C2.668 11.1211 4.966 12.0071 7.488 12.3581C7.79 11.2571 8.783 10.4501 9.99 10.4501C11.178 10.4501 12.191 11.2571 12.473 12.3681C15.005 12.0171 17.312 11.1311 19.24 9.85609V6.38909C19.24 4.69509 17.877 3.33109 16.183 3.33109H3.817C2.123 3.33109 0.75 4.69509 0.75 6.38909Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
        <li className={style.hover_left_line}>
          <a href="#">
            <span className={`${style.tooltip_category} ${style.tooltip}`}>Мои каналы</span>
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={style.hover__img}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2855 1H18.5521C19.9036 1 21 2.1059 21 3.47018V6.7641C21 8.12735 19.9036 9.23429 18.5521 9.23429H15.2855C13.933 9.23429 12.8366 8.12735 12.8366 6.7641V3.47018C12.8366 2.1059 13.933 1 15.2855 1Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={style.hover__img}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.44892 1H6.71449C8.06703 1 9.16341 2.1059 9.16341 3.47018V6.7641C9.16341 8.12735 8.06703 9.23429 6.71449 9.23429H3.44892C2.09638 9.23429 1 8.12735 1 6.7641V3.47018C1 2.1059 2.09638 1 3.44892 1Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={style.hover__img}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.44892 12.7657H6.71449C8.06703 12.7657 9.16341 13.8716 9.16341 15.2369V18.5298C9.16341 19.8941 8.06703 21 6.71449 21H3.44892C2.09638 21 1 19.8941 1 18.5298V15.2369C1 13.8716 2.09638 12.7657 3.44892 12.7657Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={style.hover__img}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2855 12.7657H18.5521C19.9036 12.7657 21 13.8716 21 15.2369V18.5298C21 19.8941 19.9036 21 18.5521 21H15.2855C13.933 21 12.8366 19.8941 12.8366 18.5298V15.2369C12.8366 13.8716 13.933 12.7657 15.2855 12.7657Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
        <li className={style.hover_left_line}>
          <a href="#">
            <span className={`${style.tooltip_voice} ${style.tooltip}`}>Блог</span>
            <svg width="24" height="24" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={style.hover__img}
                d="M1.71436 9.93196C1.71436 14.0215 5.02864 17.3358 9.11817 17.3358M9.11817 17.3358C13.2077 17.3358 16.5229 14.0215 16.5229 9.93196M9.11817 17.3358L9.11855 20.1468M11.0015 5.87691H12.9044M10.0491 9.04844H12.9044M9.24455 13.5843H8.99217C6.97121 13.5843 5.33217 11.9462 5.33217 9.92434V5.37387C5.33217 3.35291 6.97121 1.71387 8.99217 1.71387H9.24455C11.2665 1.71387 12.9045 3.35291 12.9045 5.37387V9.92434C12.9045 11.9462 11.2665 13.5843 9.24455 13.5843Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
        <li className={style.hover_left_line}>
          <a href="#">
            <span className={`${style.tooltip_info} ${style.tooltip}`}>База знаний</span>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className={style.hover__img}
                d="M9.9951 6.20434V10.6233M9.9951 13.7961H10.0051M10 0.750244C15.109 0.750244 19.25 4.89224 19.25 10.0002C19.25 15.1082 15.109 19.2502 10 19.2502C4.892 19.2502 0.75 15.1082 0.75 10.0002C0.75 4.89224 4.892 0.750244 10 0.750244Z"
                stroke="#200E32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
};
