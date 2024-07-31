import language from './../../../assets/language.svg';
import logo from './../../../assets/xzxzx 1.svg';

export default function Header() {
  return (
    <div className='sm:block hidden'>
      <div
    className="w-full px-20 py-[15px] flex justify-between items-center bg-[#00558c]">
      <div>
        <img src={logo} alt='logo' />
      </div>
      <div className='flex gap-x-4 items-center'>
        <div className='text-white text-sm'>login / register</div>
        <img src={language} alt='language' /> 
      </div>
    </div>
    <div className='py-1 bg-[#a08a59]'/>
    </div>
    
  )
}
