import { BsGithub } from 'react-icons/bs';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-[#EE3253] h-[10%] flex justify-between items-center px-4 border-b-[1em] border-[#844D38]">
      <footer className='flex justify-between w-full items-center m-[0_auto] lg:max-w-5xl'>
        <p className="text-xs font-southpark">
          {`Awesom-o ${year} `}
          &#169;
        </p>
        <BsGithub
          size={40}
          onClick={() => window.location.href = "https://github.com/jr-cast"}
          className='cursor-pointer hover:text-[#00B8C4]' />
      </footer>
    </div >
  );
}

export default Footer;
