// import Navigation from '@/app/updateProfileForm.js/Navigation';
// import Logo from '@/app/updateProfileForm.js/Logo';

import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

import { auth } from "../_lib/auth";

async function Header() {
  const session = await auth();
  return (
    <header className='px-4 py-5 md:px-8 relative z-50'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <div className="hidden md:flex">
          <Navigation />
        </div>
        <div className="flex items-center gap-4 md:hidden">
          {/* Show Guest Area icon on mobile always? Or just keep it simple. 
                Let's stick to just making the hamburger menu looks decent for now, 
                but user asked for 'visible atleas icons'. 
                I'll add the Guest Area link simply as an icon if possible.
                However, Navigation.js uses server side 'await auth()'. Header is a server component too.
                I can pass session to MobileNavigation or create a separate MobileUserIcon component.
                Let's just keep the MobileNavigation cleaner for now, but maybe the user meant the hamburger icon itself didn't look right?
                The previous implementation had MobileNavigation as a direct child of div.flex.justify-between.
                That should align right. 
                I will wrap it in a div to be safe.
            */}
          <MobileNavigation session={session} />
        </div>
      </div>
    </header>
  );
}

export default Header;
