import { LinkCard } from "@/components/ui/link-card"

export function App() {
  return (
    <main className="min-h-svh bg-background px-6 py-16 text-foreground sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-primary">
            TL GROUPS
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Start with the conversation that fits.
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <LinkCard
            title="Own a software company"
            description="Learn how TL Groups approaches acquisition and rebuilding for the long run."
            imageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
            href="https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-XJXWbfSo2f0"
          />
          <LinkCard
            title="Use one of our products"
            description="Meet the companies and systems that support the archipelago."
            imageUrl="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
            href="https://unsplash.com/photos/people-inside-building-5QgIuuBxKwM"
          />
          <LinkCard
            title="Build with us"
            description="See the teams and roles doing the work across the group."
            imageUrl="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80"
            href="https://unsplash.com/photos/people-sitting-down-near-table-with-laptop-computers-4_jhDO54BYg"
          />
        </div>
      </div>
    </main>
  )
}

export default App
