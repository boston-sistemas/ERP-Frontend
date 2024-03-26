import Image from 'next/image';

const Banner = () => {
  return (
    <div className="w-full py-4 bg-blue-600 flex justify-between items-center" style={{ backgroundColor: '#1A266A' }}>
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