import Image from "next/image";

export default function Loader() {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center ">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" src="/logo1.png" fill />
      </div>
      <p className="text-sm text-muted-foreground">Brainwee is thinking...</p>
    </div>
  );
}
