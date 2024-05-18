import { useNavigate } from "react-router-dom";
import SettingHeader from "./components/SettingHeader";
import { useState } from "react";

export default function Setting() {
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const root = document.documentElement;
    if (isDarkTheme) {
      root.style.setProperty('--background-color', '#ffffff');
      root.style.setProperty('--text-color', '#000000');
      // Add more CSS variables for light theme
    } else {
      root.style.setProperty('--background-color', '#000000');
      root.style.setProperty('--text-color', '#ffffff');
      // Add more CSS variables for dark theme
    }
  };
  

  return (
    <>
      <SettingHeader />

      <div className="page-content">
        <div className="container">
          <div className="dz-list">
            <ul>
              {/* <li>
                <a
                  href="javascript:void(0);"
                  className="item-content item-link filter m-0 filter m-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTop2"
                  aria-controls="offcanvasTop"
                >
                  <div className="dz-icon icon-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="512"
                      height="512"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 23a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm8.924-4.617a1 1 0 0 0-.217-1.09L19 15.586V10a7 7 0 0 0-6-6.92V2a1 1 0 0 0-2 0v1.08A7 7 0 0 0 5 10v5.586l-1.707 1.707A1 1 0 0 0 4 19h16a1 1 0 0 0 .924-.617zM6.414 17l.293-.293A1 1 0 0 0 7 16v-6a5 5 0 0 1 10 0v6a1 1 0 0 0 .293.707l.293.293z" />
                    </svg>
                  </div>
                  <div className="dz-inner">
                    <h6 className="mb-0">Notification</h6>
                  </div>
                </a>
              </li> */}
              <li>
                <a
                  onClick={() => navigate("/blocked")}
                  style={{ cursor: "pointer" }}
                  className="item-content item-link filter m-0 filter m-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasTop2"
                  aria-controls="offcanvasTop"
                >
                  <div className="dz-icon icon-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <path d="M 22.5 12 C 22.503906 9.472656 21.59375 7.03125 19.933594 5.125 L 5.125 19.9375 C 8.230469 22.628906 12.621094 23.261719 16.363281 21.550781 C 20.101562 19.84375 22.5 16.109375 22.5 12 Z M 4.066406 18.875 L 18.875 4.0625 C 14.710938 0.457031 8.472656 0.683594 4.578125 4.578125 C 0.683594 8.472656 0.460938 14.710938 4.066406 18.875 Z M 24 12 C 24 18.628906 18.628906 24 12 24 C 5.371094 24 0 18.628906 0 12 C 0 5.371094 5.371094 0 12 0 C 18.628906 0 24 5.371094 24 12 Z M 24 12 " />
                    </svg>
                  </div>
                  <div className="dz-inner">
                    <h6 className="mb-0">Blocked Users</h6>
                  </div>
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/wallet")}
                  style={{ cursor: "pointer" }}
                  className="item-content item-link filter m-0"
                >
                  <div className="dz-icon icon-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-wallet"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1" />
                    </svg>
                  </div>
                  <div className="dz-inner">
                    <h6 className="mb-0">Wallet</h6>
                  </div>
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/privacy-policy")}
                  style={{ cursor: "pointer" }}
                  className="item-content item-link filter m-0"
                >
                  <div className="dz-icon icon-sm">
                    <svg
                      height="512"
                      viewBox="0 0 512 512"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="b">
                        <path d="m256.64 38.6c58.7 19.44 118.95 42.33 170.47 62.31 3.58 23.45 8.49 63.67 9.43 112.29.83 55.38-3.75 85.93-5.78 96.58-4.25 14.67-13.17 30.61-26.51 47.37-15.82 19.86-37.36 40.51-64.02 61.36-.02.01-.04.03-.05.04-37.89 29.74-72.97 48.91-83.54 54.43-10.57-5.51-45.61-24.64-83.48-54.36l-.05-.04c-26.65-20.84-48.18-41.48-63.97-61.33-12.67-15.93-21.35-31.13-25.83-45.18-.12-.47-.25-.94-.4-1.42-2-6.77-8.43-34.04-7.46-101.16 1.06-42.76 4.98-80.96 11.1-108.84 51.36-19.89 111.43-42.68 170.09-62.06m0-38.51c-3.01 0-6.03.48-8.96 1.45-57.51 18.9-116.5 41.07-176.49 64.31-8.07 3.13-14.84 8.92-19.24 15.96.34.04-12.33 39.59-14.49 126.94-1.28 87.36 9.6 113.53 9.24 113.56 5.89 19.2 16.91 38.73 32.7 58.59 17.65 22.18 41.5 45.09 70.31 67.61 47.69 37.43 92.32 59.8 94.19 60.59 4.04 1.98 8.33 2.98 12.75 2.98h.01c4.43 0 8.72-1.01 12.76-3 1.88-.79 46.56-23.23 94.23-60.65 28.82-22.54 52.67-45.45 70.33-67.62 16.92-21.27 28.36-42.14 33.89-62.64-.22-.03 7.78-32.11 6.67-105.62-1.41-73.5-11.65-127.71-11.51-127.76-4.26-8.31-11.73-15.26-20.87-18.81-60-23.25-119-45.46-176.52-64.42-2.95-.97-5.97-1.46-8.99-1.46z" />
                        <path d="m256.61 353.07c-10.96 0-21.26-4.26-29-12.01-7.75-7.75-12.02-18.05-12.02-29v-32.03c-16.76-12.55-26.78-32.21-26.79-53.7 0-37.05 30.14-67.2 67.19-67.21 17.95 0 34.83 6.99 47.52 19.68s19.69 29.57 19.69 47.52c0 20.83-9.57 40.16-25.58 52.77v32.97c0 10.96-4.26 21.26-12.01 29-7.75 7.75-18.05 12.01-29 12.02zm-.61-155.96c-16.1 0-29.2 13.1-29.2 29.2 0 11.16 6.22 21.19 16.24 26.17 6.46 3.21 10.54 9.8 10.54 17.01v42.56c0 1.66 1.36 3.02 3.02 3.02 1.03 0 1.73-.48 2.13-.88s.88-1.1.88-2.13v-43.17c0-7.02 3.87-13.47 10.07-16.77 9.57-5.1 15.52-14.98 15.51-25.8 0-7.8-3.04-15.13-8.55-20.65-5.52-5.51-12.85-8.55-20.65-8.55z" />
                      </g>
                    </svg>
                  </div>
                  <div className="dz-inner">
                    <h6 className="mb-0">Privacy Policy</h6>
                  </div>
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/terms-and-conditions")}
                  style={{ cursor: "pointer" }}
                  className="item-content item-link filter m-0"
                >
                  <div className="dz-icon icon-sm">
                    <svg
                      height="512"
                      viewBox="0 0 512 512"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m276 374c0 11.046-8.954 20-20 20h-118c-11.046 0-20-8.954-20-20s8.954-20 20-20h118c11.046 0 20 8.954 20 20zm236-253.85v234.183c0 30.708-11.958 59.576-33.672 81.289l-42.706 42.707c-21.713 21.713-50.581 33.671-81.289 33.671h-234.183c-66.411 0-120.15-53.745-120.15-120.15v-271.7c0-66.411 53.745-120.15 120.15-120.15h271.7c66.411 0 120.15 53.745 120.15 120.15zm-42.683 254.183h-54.984c-22.056 0-40 17.944-40 40v54.984c12.362-3.4 23.692-9.961 33.004-19.272l42.707-42.708c9.312-9.312 15.873-20.642 19.273-33.004zm2.683-254.183c0-44.301-35.851-80.15-80.15-80.15h-271.7c-44.301 0-80.15 35.851-80.15 80.15v271.7c0 44.301 35.851 80.15 80.15 80.15h214.183v-57.667c0-44.112 35.888-80 80-80h57.667zm-98 115.85h-236c-11.046 0-20 8.954-20 20s8.954 20 20 20h236c11.046 0 20-8.954 20-20s-8.954-20-20-20zm0-118h-236c-11.046 0-20 8.954-20 20s8.954 20 20 20h236c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
                    </svg>
                  </div>
                  <div className="dz-inner">
                    <h6 className="mb-0">Terms And Conditions</h6>
                  </div>
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/logout")}
                  style={{ cursor: "pointer" }}
                  className="item-content item-link filter m-0"
                >
                  <div className="dz-icon icon-sm">
                    <svg
                      height="512"
                      viewBox="0 0 32 32"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m29.44 16.43a1.15 1.15 0 0 0 -.24-1.23l-3.2-3.2a1.12 1.12 0 0 0 -1.59 1.59l1.26 1.26h-7.28a1.12 1.12 0 0 0 0 2.25h7.29l-1.26 1.26a1.12 1.12 0 1 0 1.58 1.64l3.18-3.18a1.12 1.12 0 0 0 .26-.39z" />
                      <path d="m21.6 20.43a1.12 1.12 0 0 0 -1.12 1.12v4.57a1.13 1.13 0 0 1 -1.12 1.12h-4.5v-22.49h4.5a1.13 1.13 0 0 1 1.12 1.12v4.43a1.12 1.12 0 1 0 2.25 0v-4.42a3.38 3.38 0 0 0 -3.37-3.37h-4.63a3.36 3.36 0 0 0 -4.32-2.33l-5.63 1.87a3.37 3.37 0 0 0 -2.31 3.2v21.5a3.37 3.37 0 0 0 2.31 3.2l5.62 1.88a3.4 3.4 0 0 0 1.08.18 3.37 3.37 0 0 0 3.24-2.51h4.62a3.38 3.38 0 0 0 3.37-3.37v-4.57a1.12 1.12 0 0 0 -1.11-1.13zm-9 8.19a1.13 1.13 0 0 1 -1.48 1.07l-5.62-1.88a1.13 1.13 0 0 1 -.77-1.07v-21.49a1.13 1.13 0 0 1 .77-1.06l5.62-1.88a1.13 1.13 0 0 1 1.48 1.07z" />
                    </svg>
                  </div>
                  <div className="dz-inner">
                    <h6 className="mb-0">Log out</h6>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <button
            onClick={toggleTheme}
            className="btn btn-primary"
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
          >
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        </div>
      </div>
    </>
  );
}
