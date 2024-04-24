import { Button } from "@/components/ui/button";
import Image from "next/image";

const FooterPage = () => {
  return (
    <footer className="hidden lg:block border-t-2 dark:border-none w-full h-16 border-slate-100 p-2">
    <div className="max-w-screen-lg mx-auto items-center justify-evenly
    h-full flex">
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/es.svg"
      alt="Spain"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      Spanish
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/fr.svg"
      alt="France"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      French
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/in.svg"
      alt="India"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      Indian
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/it.svg"
      alt="Italian"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      Italian
    </Button>
    <Button variant="ghost" size="lg" className="w-full">
      <Image
      src="/jp.svg"
      alt="Japan"
      height={32}
      width={40}
      className="mr-4 rounded-md"
      />
      Japanese
    </Button>
    </div>
    </footer>
  );
};

export default FooterPage;
