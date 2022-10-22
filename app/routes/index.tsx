import { TechCard } from "~/components/TechCard";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 space-y-2">
      <div className="container mx-auto space-y-2 text-center">
        <h1 className="p-4 text-6xl sm:text-8xl text-green-500 font-mono">Welcome!</h1>
        <p className="p-4 text-xl max-w-5xl mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic,
          temporibus adipisci. Aspernatur, unde veniam alias libero inventore
          facere eligendi modi voluptatem sunt! Sequi nisi similique cum.
          Praesentium harum minus nulla!
        </p>
        <div className="p-4 flex flex-wrap gap-4 justify-center">
          <TechCard
            title="remix"
            src="https://i.ibb.co/ysLtB6p/800x800-Glowing.png"
            alt="remix logo"
          />
          <TechCard
            title="prisma"
            src="https://iconape.com/wp-content/files/xs/85603/svg/prisma-3.svg"
            alt="prisma logo"
          />
          <TechCard
            title="mongodb"
            src="https://masai-website-images.s3.ap-south-1.amazonaws.com/mongodb_8a65496daa.svg"
            alt="mongodb logo"
          />
          <TechCard
            title="tailwindcss"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
            alt="tailwindcss logo"
          />
          <TechCard
            title="vercel"
            src="https://www.svgrepo.com/show/327408/logo-vercel.svg"
            alt="vercel logo"
          />
        </div>
      </div>
    </div>
  );
}
