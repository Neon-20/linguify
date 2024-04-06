import { Button } from "@/components/ui/button";

const Buttons = () => {
  return (
    <div className="items-center justify-center flex flex-col p-14 space-y-6">
      <Button>default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">Primary Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryOutline">Secondary Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger Outline</Button>
      <Button variant="super">Super</Button>
      <Button variant="superOutline">Super Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">SideBar</Button>
      <Button variant="sidebarOutline">SideBar Outline</Button>
    </div>
  );
};

export default Buttons;
