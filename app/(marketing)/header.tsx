// import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import {Loader} from "lucide-react";
// import { 
//   SignedIn,
//   SignedOut,
//   SignInButton
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";
import {Loader} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const HeaderPage = () => {
  return ( 
    <header className="h-16 w-full border-b-2 border-slate-100
    px-4">
    <div className="h-full lg:max-w-screen-lg mx-auto items-center
    justify-between flex">
    <div className="pt-8 pb-7 flex items-center gap-x-3">
    <Image
    src="/mascot.svg"
    alt="Mascot"
    height={40} width={40}
    />
    <h1 className="uppercase text-xl font-extrabold text-green-600
    tracking-wide cursor-pointer">
    <Link href="/">
    Linguify
    </Link>
    </h1>
    </div>
    <ClerkLoading>
      <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
    </ClerkLoading>
    <ClerkLoaded>
      <SignedIn>
        <UserButton afterSignOutUrl="/"/>
      </SignedIn>
      <SignedOut>
        <SignInButton
        afterSignInUrl="/learn"
        afterSignUpUrl="/learn"
        mode="modal"
        >
        <Button variant="ghost">
          Login 👨🏻‍💻
        </Button>
        </SignInButton>
      </SignedOut>
    </ClerkLoaded>
    </div>
    </header>
  );
}

export default HeaderPage;









