import { useEffect, useState } from "react";
import {
  ChartColumn,
  ChartNoAxesCombined,
  Check,
  Copy,
  Dot,
  Ellipsis,
  ExternalLink,
  Globe,
  Link2,
  Loader,
  MousePointerClick,
  Plus,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { useUrlStore } from "../store/urlStore";
import { formatDate } from "../utils/formatDate";
export const DashboardComp = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const createLink = useUrlStore((state) => state.createLink);
  const getUrls = useUrlStore((state) => state.getUrls);
  const isCreatingLink = useUrlStore((state) => state.isCreatingLink);
  useEffect(() => {
    getUrls();
  }, [getUrls]);
  const urls = useUrlStore((state) => state.urls);
  const handleSubmit = async () => {
    await createLink(url);
    await getUrls();
  };
  const totalClicks =
    urls?.reduce((sum, m) => {
      return sum + (m.clicks ?? 0);
    }, 0) ?? 0;
  const maxClicks = urls?.reduce((max, curr) => {
    return (curr.clicks ?? 0) > (max.clicks ?? 0) ? curr : max;
  }, urls[0]);
  return (
    <div className="h-screen w-full">
      <Navbar />

      <div className="mt-14 flex w-full justify-center">
        <div className="w-full max-w-7xl px-6 flex flex-col items-center">
          <div className="w-full rounded-xl md:px-6 py-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <div className="text-4xl font-semibold">Dashboard</div>
              <div className="text-md text-neutral-500 opacity-60 mt-2">
                Manage and track your shortlinks
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto px-6 sm:px-8 hover:opacity-90 hover:cursor-pointer flex items-center justify-center rounded-lg h-12 sm:h-12 bg-black gap-2 text-white text-base sm:text-sm"
            >
              <Plus size={18} />
              Create Link
            </button>
          </div>

          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-8">
            <div className="h-40 border border-neutral-200 flex flex-col justify-center px-5 rounded-xl">
              <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg">
                <MousePointerClick />
              </div>
              <div className="text-3xl font-bold mt-5">{totalClicks}</div>
              <div className="text-sm text-neutral-600">Total Clicks</div>
            </div>

            <div className="h-40 border border-neutral-200 flex flex-col justify-center px-5 rounded-xl">
              <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg">
                <Link2 />
              </div>
              <div className="text-3xl font-bold mt-5">{urls?.length || 0}</div>
              <div className="text-sm text-neutral-600">Active Links</div>
            </div>

            <div className="h-40 border border-neutral-200 flex flex-col justify-center px-5 rounded-xl">
              <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg">
                <ChartNoAxesCombined />
              </div>
              <div className="text-3xl font-bold mt-5">{maxClicks?.clicks}</div>
              <div className="text-sm text-neutral-600">Most Clicks</div>
            </div>

            <div className="h-40 border border-neutral-200 flex flex-col justify-center px-5 rounded-xl">
              <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg">
                <Globe />
              </div>
              <div className="text-3xl font-bold mt-5">89</div>
              <div className="text-sm text-neutral-600">Countries</div>
            </div>
          </div>
          <div className="w-full mt-10  mb-10 px-2 md:px-8">
            <div className="border rounded-2xl min-h-40 border-neutral-200">
              <div className="p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xl font-semibold antialiased">
                  Your Links
                </div>
                <input
                  type="text"
                  placeholder="Search links..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 h-10 px-4 border border-neutral-200 rounded-lg text-sm 
                             focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              {urls
                ?.filter((m) =>
                  m.shortUrl.toLowerCase().includes(search.toLowerCase()),
                )
                .map((m) => (
                  <div className="border-t hover:bg-neutral-50 border-t-neutral-200 flex flex-col lg:flex-row lg:items-center px-5 py-4 gap-3">
                    <div className="">
                      <div className="flex items-center">
                        <Dot size={50} className=" -ml-5 -mr-3" />
                        <div className="font-mono text-sm">
                          shrtn.com/{m.shortUrl}
                        </div>
                        {copiedId === m.id ? (
                          <Check size={16} className="ml-3 text-neutral-600" />
                        ) : (
                          <Copy
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `shrtn.com/${m.shortUrl}`,
                              );
                              setCopiedId(m.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            size={16}
                            className="ml-3 text-neutral-600"
                          />
                        )}
                        <a href={m.originalUrl} target="_blank">
                          <ExternalLink
                            className="ml-3 text-neutral-600 "
                            size={16}
                          />
                        </a>
                      </div>
                      <div className="text-sm text-neutral-500 mb-2 max-w-90 sm:max-w-100 truncate">
                        {m.originalUrl}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 lg:ml-auto text-sm text-neutral-700">
                      <div className="flex items-center gap-2 font-semibold">
                        <ChartColumn size={18} className="text-neutral-500" />
                        {m.clicks ?? 0} clicks
                      </div>
                      <div className="hidden sm:block text-neutral-500">
                        {formatDate(m.createdAt)}
                      </div>
                      <Ellipsis size={20} className="text-neutral-500" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          {isCreatingLink ? (
            <Loader className="animate-spin" />
          ) : (
            <div
              className="w-full max-w-md bg-white rounded-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xl font-semibold">Create New Short Link</div>
              <div className="text-neutral-500 text-sm">
                Enter a long URL to create a shortened version.
              </div>

              <div className="mt-10 text-neutral-700">Destination URL</div>
              <input
                type="text"
                placeholder="http://example.com/very-long-url..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-2 w-full h-12 px-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white placeholder:text-neutral-500 placeholder:text-sm bg-neutral-50"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 h-10 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    console.log("Create short link for:", url);
                    await handleSubmit();
                    setOpen(false);
                    setUrl("");
                  }}
                  className="px-4 h-10 rounded-lg bg-black text-white"
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
