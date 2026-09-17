import { footer } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
                  <img
                    src="/art/logo.svg"
                    alt=""
                    aria-hidden
                    className="inline-block mb-1 w-12 h-12"
                  />{" "}
                  {column.title}
                </h2>
                <p className="text-sm text-gray-400">{column.blurb}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {column.links.map((group, gi) => (
                  <ul key={gi} className="space-y-3">
                    {group.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <span className="text-xs sm:text-sm text-gray-400">
            {footer.copyright}
          </span>
          <a
            href="#home"
            className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
