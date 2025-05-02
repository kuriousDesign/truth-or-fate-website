import Link from 'next/link';
import { AiFillAmazonCircle, AiOutlineMessage, AiOutlineInstagram } from "react-icons/ai";
import SocialsBackgroundMobile from './SocialsBackgroundMobile';

const Socials = () => {
  const youtubeChannelUrl = 'https://www.youtube.com/@kurious-design';
  const amazonUrl = 'https://a.co/d/69WQv8A';
  const instagramUrl = 'https://www.instagram.com/truthorfate/';
  return (
    <div>
      <SocialsBackgroundMobile />
      <div className='z-50 fixed bottom-3 xl:bottom-5 left-1/2 -translate-x-1/2 w-[200px] h-auto flex flex-row justify-between items-center'>
        <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" className='hover:text-accent transition-all duration-300 flex items-center'>
          <AiOutlineInstagram className='w-[24px] h-[24px] xl:w-[32px] xl:h-[32px]' />
        </Link>
        <Link href={amazonUrl} target="_blank" rel="noopener noreferrer" className='hover:text-accent transition-all duration-300 flex items-center'>
          <AiFillAmazonCircle className='w-[24px] h-[24px] xl:w-[32px] xl:h-[32px]' />
        </Link>

        {true && (
          <Link href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className='hover:text-accent transition-all duration-300 flex items-center'>
            <AiOutlineMessage className='w-[24px] h-[24px] xl:w-[32px] xl:h-[32px]' />
          </Link>
        )}

      </div>
    </div>
  );
};

export default Socials;
