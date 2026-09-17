import { team } from "@/content/site";

export default function TeamSection() {
  return (
    <section id="team" className="relative py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight">
            {team.heading}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-3">
            {team.blurb}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {team.people.map((person) => (
            <div
              key={person.name}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl cursor-pointer"
            >
              <img
                src={person.art}
                alt=""
                aria-hidden
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-0 right-0 bottom-0 p-3 z-20 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                <div className="text-white font-semibold">{person.name}</div>
              </div>
              <div className="absolute left-0 right-0 bottom-0 p-4 z-30 transform transition-transform duration-400 bg-black/95 translate-y-full group-hover:translate-y-0">
                <div className="text-indigo-500 font-semibold">
                  {person.role}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {person.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
