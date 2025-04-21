import { Outlet } from 'react-router-dom';
import logo from '@/assets/logo.png'; // adjust path as needed

function AuthLayout() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden" 
      style={{
        background: 'linear-gradient(151.08deg, #FFFFFF 20.71%, #183BA3 66.01%)',
        backgroundBlendMode: 'lighten',  // Apply the background blend mode
      }}
    >
      {/* Container with fixed aspect ratio */}
      <div className="relative w-full max-w-[1524px] aspect-[1524/857] mx-auto">

        {/* Background Ellipses (Responsive) */}
        <div className="absolute bg-[rgba(253,188,49,0.19)] rounded-full"
          style={{
            width: '20.47%',        // 312 / 1524
            height: '35.34%',       // 303 / 857
            top: '-10.62%',         // -91 / 857
            left: '87.99%',         // 1341 / 1524
            // mixBlendMode: 'multiply', // Blends the ellipse with the background
          }}
        />
        <div className="absolute bg-[rgba(253,188,49,0.19)] rounded-full"
          style={{
            width: '20.47%',
            height: '35.34%',
            top: '80.74%',          // 692 / 857
            left: '35.36%',         // 539 / 1524
            // mixBlendMode: 'multiply',
          }}
        />
        <div className="absolute bg-[rgba(253,188,49,0.19)] rounded-full"
          style={{
            width: '20.47%',
            height: '35.34%',
            top: '84.59%',          // 725 / 857
            left: '-9.06%',         // -138 / 1524
            // mixBlendMode: 'multiply',
          }}
        />

        {/* Content */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          {/* Left side (branding/message) */}
          <div className="w-1/2 h-[calc(100%-20.34%)] p-10 flex flex-col justify-between z-10">
            {/* <div> */}
              <img src={logo} alt="LemonPay Logo" className="w-40 mb-8" />
              <div >
                <h2 className="text-4xl font-semibold">Join 8 Million Businesses</h2>
                <h2 className="text-yellow-300 text-4xl mt-2">Powering Growth with Lemonpay!</h2>
                <h2 className="text-4xl font-semibold">LemonPay!</h2>
              </div>
            {/* </div> */}
          </div>

          {/* Right side (form outlet) */}
          <div className="w-1/2 p-10 flex flex-col justify-center items-end z-10">
             
            <Outlet />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
