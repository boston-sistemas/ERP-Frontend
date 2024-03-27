import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

const Banner = () => {
  const theme = useTheme();
  return (
    <div className="w-full flex justify-between items-center" style={{ ...theme.mixins.toolbar, backgroundColor: '#1A266A' }}>
      <div className="pl-4">
        <Image src="/logoMecsa.png" alt="Logo Mecsa" width={100} height={50} />
      </div>
      <div className="pr-4">
        <Image src="/logoBoston.png" alt="Logo Boston" width={100} height={50} />
      </div>
    </div>
  );
};

export default Banner;