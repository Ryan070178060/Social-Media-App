export default function SplashScreen() {
  return (
    <>
      <div className="loader-screen" id="">
        <div className="main-screen">
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
          <div className="circle-5"></div>
          <div className="circle-6"></div>
          <div className="brand-logo">
            <div className="text-center">
              <img
                src="/assets/images/favicon.png"
                alt="spoon-1"
                className="wow bounceInDown"
                style={{ width: "100px" }}
              />
            </div>
            <div id="loading-area" className="loading-page-4">
              <div className="loading-inner">
                <div className="load-text">
                  <span data-text="R" className="text-load">
                    R
                  </span>
                  <span data-text="I" className="text-load">
                    I
                  </span>
                  <span data-text="Z" className="text-load">
                    Z
                  </span>
                  <span data-text="Z" className="text-load">
                    Z
                  </span>
                  <span data-text="Y" className="text-load">
                    Y
                  </span>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
