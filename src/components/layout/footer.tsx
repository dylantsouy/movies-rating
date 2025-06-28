'use client';

const Footer = () => {
  return (
    <footer className='bg-black text-gray-400 py-8 px-6 border-t border-gray-800'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <p className='text-sm'>
              &copy; {new Date().getFullYear()} MovieFlix. All rights reserved.
            </p>
          </div>
          <div className='flex gap-4'>
            <button
              className='text-sm hover:text-white bg-transparent border-none cursor-pointer underline'
              onClick={() => {
                /* Handle Terms of Service navigation */
              }}
            >
              Terms of Service
            </button>
            <button
              className='text-sm hover:text-white bg-transparent border-none cursor-pointer underline'
              onClick={() => {
                /* Handle Privacy Policy navigation */
              }}
            >
              Privacy Policy
            </button>
            <button
              className='text-sm hover:text-white bg-transparent border-none cursor-pointer underline'
              onClick={() => {
                /* Handle Contact Us navigation */
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
