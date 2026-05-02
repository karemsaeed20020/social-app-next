import { PostsFilters, SettingsCard, SuggestedFriends } from "@/features";
import { Navbar } from "@/shared";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="relative mx-auto max-w-7xl p-4">
        <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
          <aside className="hidden h-fit space-y-4 xl:sticky xl:top-18 xl:block">
            <PostsFilters />
            <SettingsCard />
          </aside>

          <section className="space-y-4 overflow-x-hidden">
            <div className="xl:hidden space-y-4">
              <SuggestedFriends />
              <PostsFilters />
            </div>

            {children}
          </section>

          <aside className="hidden h-fit xl:sticky xl:top-18 xl:block">
            <SuggestedFriends />
          </aside>
        </div>
      </main>
    </>
  );
}
